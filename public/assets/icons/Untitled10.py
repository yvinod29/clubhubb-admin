#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import numpy as np 
import pandas as pd 
import matplotlib.pyplot as plt
import cv2
import tensorflow as tf
from PIL import Image
import os
from sklearn.model_selection import train_test_split
from keras.utils import to_categorical
from keras.models import Sequential, load_model
from keras.layers import Conv2D, MaxPool2D, Dense, Flatten, Dropout

data = []
labels = []
classes = 43
cur_path = os.getcwd()

#Retrieving the images and their labels 
for i in range(classes):
    path = os.path.join(cur_path,'Downloads\\traffic_Data\\DATA',str(i))
    images = os.listdir(path)

    for a in images:
        try:
            image = Image.open(path + '\\'+ a)
            image = image.resize((30,30))
            image = np.array(image)
            #sim = Image.fromarray(image)
            data.append(image)
            labels.append(i)
            
        except:
            print("Error loading image")

#Converting lists into numpy arrays
data = np.array(data)
labels = np.array(labels)

print(data.shape, labels.shape)
#Splitting training and testing dataset
X_train, X_test, y_train, y_test = train_test_split(data, labels, test_size=0.2, random_state=42)

print(X_train.shape, X_test.shape, y_train.shape, y_test.shape)

#Converting the labels into one hot encoding
y_train = to_categorical(y_train, 43)
y_test = to_categorical(y_test, 43)

#Building the model
model = Sequential()
model.add(Conv2D(filters=32, kernel_size=(5,5), activation='relu', input_shape=X_train.shape[1:]))
model.add(Conv2D(filters=32, kernel_size=(5,5), activation='relu'))
model.add(MaxPool2D(pool_size=(2, 2)))
model.add(Dropout(rate=0.25))
model.add(Conv2D(filters=64, kernel_size=(3, 3), activation='relu'))
model.add(Conv2D(filters=64, kernel_size=(3, 3), activation='relu'))
model.add(MaxPool2D(pool_size=(2, 2)))
model.add(Dropout(rate=0.25))
model.add(Flatten())
model.add(Dense(256, activation='relu'))
model.add(Dropout(rate=0.5))
model.add(Dense(43, activation='softmax'))

#Compilation of the model
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

epochs = 15
history = model.fit(X_train, y_train, batch_size=32, epochs=epochs, validation_data=(X_test, y_test))
model.save("traffic_classifier.h5")

#plotting graphs for accuracy 
plt.figure(0)
plt.plot(history.history['accuracy'], label='training accuracy')
plt.plot(history.history['val_accuracy'], label='val accuracy')
plt.title('Accuracy')
plt.xlabel('epochs')
plt.ylabel('accuracy')
plt.legend()
plt.show()

plt.figure(1)
plt.plot(history.history['loss'], label='training loss')
plt.plot(history.history['val_loss'], label='val loss')
plt.title('Loss')
plt.xlabel('epochs')
plt.ylabel('loss')
plt.legend()
plt.show()

 


# In[ ]:


print(X_train.shape, X_test.shape, y_train.shape, y_test.shape)


# In[ ]:





# In[ ]:


#testing accuracy on test dataset
from sklearn.metrics import accuracy_score

 
 # Predict classes for test set
pred = model.predict(X_test)

#Accuracy with the test data
from sklearn.metrics import accuracy_score
print(accuracy_score( y_test, pred))


# In[ ]:


X_test
   


# In[ ]:


y_test


# In[ ]:


X_train


# In[ ]:


y_train
   
   
   


# In[ ]:





# In[ ]:





# In[ ]:


import tkinter as tk
from tkinter import filedialog
from tkinter import *
from PIL import ImageTk, Image
import numpy
#load the trained model to classify sign
from keras.models import load_model
model = load_model('traffic_classifier.h5')
#dictionary to label all traffic signs class.
classes = {
  0: "Speed limit (5km/h)",
  1: "Speed limit (15km/h)",
  2: "Speed limit (30km/h)",
  3: "Speed limit (40km/h)",
  4: "Speed limit (50km/h)",
  5: "Speed limit (60km/h)",
  6: "Speed limit (70km/h)",
  7: "speed limit (80km/h)",
  8: "Dont Go straight or left",
  9: "Dont Go straight or Right",
  10: "Dont Go straight",
  11: "Dont Go Left",
  12: "Dont Go Left or Right",
  13: "Dont Go Right",
  14: "Dont overtake from Left",
  15: "No Uturn",
  16: "No Car",
  17: "No horn",
  18: "Speed limit (40km/h)",
  19: "Speed limit (50km/h)",
  20: "Go straight or right",
  21: "Go straight",
  22: "Go Left",
  23: "Go Left or right",
  24: "Go Right",
  25: "keep Left",
  26: "keep Right",
  27: "Roundabout mandatory",
  28: "watch out for cars",
  29: "Horn",
  30: "Bicycles crossing",
  31: "Uturn",
  32: "Road Divider",
  33: "Traffic signals",
  34: "Danger Ahead",
  35: "Zebra Crossing",
  36: "Bicycles crossing",
  37: "Children crossing",
  38: "Dangerous curve to the left",
  39: "Dangerous curve to the right",
  40: "Unknown1",
  41: "Unknown2",
  42: "Unknown3"
}

#initialise GUI
top=tk.Tk()
top.geometry('800x600')
top.title('Traffic sign classification')
top.configure(background='#CDCDCD')
label=Label(top,background='#CDCDCD', font=('arial',15,'bold'))
sign_image = Label(top)
def classify(file_path):
   global label_packed
   image = Image.open(file_path)
   image = image.resize((30,30))
   image = numpy.expand_dims(image, axis=0)
   image = numpy.array(image)
   pred = model.predict([image])
   pred_class = numpy.argmax(pred, axis=-1)[0]

   sign = classes[pred_class]
   print(sign)
   label.configure(foreground='#011638', text=sign)
def show_classify_button(file_path):
   classify_b=Button(top,text="Classify Image",command=lambda: classify(file_path),padx=10,pady=5)
   classify_b.configure(background='#364156', foreground='white',font=('arial',10,'bold'))
   classify_b.place(relx=0.79,rely=0.46)
def upload_image():
    try:
        file_path = filedialog.askopenfilename()
        uploaded = Image.open(file_path)
        uploaded.thumbnail(((top.winfo_width() / 2.25), (top.winfo_height() / 2.25)))
        im = ImageTk.PhotoImage(uploaded)
        sign_image.configure(image=im)
        sign_image.image = im
        label.configure(text='')  # Corrected this line
        show_classify_button(file_path)
        print("some")
    except Exception as e:
        print(e)

upload=Button(top,text="Upload an image",command=upload_image,padx=10,pady=5)
upload.configure(background='#364156', foreground='white',font=('arial',10,'bold'))
upload.pack(side=BOTTOM,pady=50)
sign_image.pack(side=BOTTOM,expand=True)
label.pack(side=BOTTOM,expand=True)
heading = Label(top, text="check traffic sign",pady=20, font=('arial',20,'bold'))
heading.configure(background='#CDCDCD',foreground='#364156')
heading.pack()
top.mainloop()


# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:




