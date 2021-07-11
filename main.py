import random
from tkinter import *
from tkinter import ttk
from random import choice
import csv
import math
from flask import Flask, request, render_template, jsonify
import flask_wtf

Minute = 1
reps = 0
timer = None
sample_texts = ''
WORD = ''

app = Flask(__name__)


SCORE = 0
with open('1-1000.txt',) as file:
    words = file.readlines()




def check_word(event):
    global SCORE
    global sample_texts
    data = sample_texts
    word =''
    new_word = word.strip(" ")
    if new_word in data:
        SCORE += 1
        data.remove(new_word)


@app.route('/')
def type_test():
    global WORD
    sample_texts = ''
    WORD = [random.choice(words).strip("\n") for i in range(200)]
    for i in WORD:
        sample_texts += i+' '
    return render_template('index.html', word=sample_texts)

@app.route('/array')
def send_array():
    global WORD
    #WORD = [random.choice(words).strip("\n") for i in range(200)]
    return jsonify(WORD)

if __name__ == '__main__':
    app.run(debug=True)
