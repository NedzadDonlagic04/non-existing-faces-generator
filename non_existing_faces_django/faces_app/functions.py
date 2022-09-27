import cv2
import random
import base64
import random_face
import numpy as np

engine = random_face.get_engine() # get engine on import so it doesn't have to be gotten everytime a function is run
EFFECTS = ('grayscale','sepia') # EFFECTS tuple (we will use this to randomize effects)

def _to_sepia(image):
    # Kernel matrix for Sepia effect
    # Useful link for understanding kernels https://setosa.io/ev/image-kernels/

    kernel = np.array([[0.272,0.534,0.131],
              [0.349,0.686,0.168],
              [0.393,0.769,0.189]])

    return cv2.transform(image,kernel)

def _to_grayscale(image):
    return cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)

EFFECT_FUNCTIONS = { # using this like switch case
    "sepia": _to_sepia,
    "grayscale":_to_grayscale
}

def get_random_face(effects=False):
    face = engine.get_random_face()

    if effects:
        effect = random.choice(EFFECTS)
        func = EFFECT_FUNCTIONS[effect]
        face = func(face)

    retval,buffer = cv2.imencode(".jpg",face)
    b64_string = "data:image/jpeg;base64," + base64.b64encode(buffer).decode()

    return b64_string