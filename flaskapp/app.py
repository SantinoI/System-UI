from flask import Flask, jsonify,request
import json
from flask_cors import CORS
from sistemi import *
from schema1 import *
from controllori import *
import sympy
import numpy

app = Flask(__name__)
CORS(app)

@app.route('/')
def ciao():
        return "ciao"

@app.route('/system', methods=['POST'])
def input():
 

    data = request.form.to_dict(flat=False)
    final = json.loads(data.get('system')[0])
    equations = final.get('equations')
    time = final.get('time')
    input = final.get('input')
    flow = final.get('flow')
    controller = final.get('controller')
    print(equations,time,input,flow,controller)
    vettore_tempi = []
    vettore_output = []
    if flow == 1:
        print("caso1")
        if(controller):
            vettore_tempi, vettore_output, ref_array, auto_val1, stabilita1 = schema1_evaluate_controller(equations,time,input,controller)
            equations['G1']['autovalori'] = str(auto_val1)
            equations['G1']['stabilita']= stabilita1
            return jsonify({"tempi":vettore_tempi,"output":vettore_output,"ref":ref_array,"equations":equations})
        else:
            vettore_tempi,vettore_output, auto_val,stabilita = schema1_evaluate(equations,time,input)
            equations['G1']['autovalori'] = str(auto_val)
            equations['G1']['stabilita'] = stabilita
    if flow == 2:
        print("caso2")
        if(controller):
            vettore_tempi,vettore_output,ref_array, auto_val_1, auto_val_2, stab1, stab2 = schema2_evaluate_controller(equations,time,input,controller)
            equations['G1']['autovalori'] = str(auto_val_1)
            equations['G1']['stabilita'] = stab1
            equations['G2']['autovalori'] = str(auto_val_2)
            equations['G2']['stabilita']= stab2 
            return jsonify({"tempi":vettore_tempi,"output":vettore_output,"ref":ref_array,"equations":equations})
        else:
            vettore_tempi,vettore_output, auto_val_1, auto_val_2, stab1, stab2 = schema2_evaluate(equations,time,input)
        equations['G1']['autovalori'] = str(auto_val_1)
        equations['G1']['stabilita'] = stab1
        equations['G2']['autovalori'] = str(auto_val_2)
        equations['G2']['stabilita']= stab2
    if flow == 3:
        print("caso3")
        if(controller):
            vettore_tempi,vettore_output,ref_array, auto_val_1, auto_val_2, auto_val_3, stab1, stab2, stab3 = schema3_evaluate_controller(equations,time,input,controller)
            equations['G1']['autovalori'] = str(auto_val_1)
            equations['G2']['autovalori'] = str(auto_val_2)
            equations['G3']['autovalori'] = str(auto_val_3)
            equations['G1']['stabilita'] = stab1
            equations['G2']['stabilita'] = stab2
            equations['G3']['stabilita'] = stab3
            return jsonify({"tempi":vettore_tempi,"output":vettore_output,"ref":ref_array,"equations":equations})
    #createController(controller)
     
    return jsonify({"tempi":vettore_tempi,"output":vettore_output,"equations":equations})
