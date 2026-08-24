from PIL import Image
import numpy as np

img = Image.open("src/assets/flocka-logo.jpg").convert("RGBA")
data = np.array(img)

# White background is near [255, 255, 255, 255]
r, g, b, a = data.T
white_areas = (r > 240) & (g > 240) & (b > 240)
data[..., :-1][white_areas.T] = (0, 0, 0)
data[..., -1][white_areas.T] = 0

img_transparent = Image.fromarray(data)

# Crop to bounding box
bbox = img_transparent.getbbox()
if bbox:
    img_transparent = img_transparent.crop(bbox)

img_transparent.save("src/assets/flocka-logo.png")
print("Logo processed!")
