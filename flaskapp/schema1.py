
from controllori  import *
from reference  import *
from sistemi import *


def choose_system(equations):
    stabilita1 = ""
    #print(equations)
    if (equations['y2'] == "0"):
        A= float(equations['y'])
        B = float(equations['u'])
        G1 = firstDegree(A,B)
        auto_val = stability1(A)
        if auto_val < 0:
            stabilita1 = "Asintoticamente stabile"
        elif auto_val > 0:
            stabilita1 = "Instabile"
        else:
            stabilita1 = "Stabile semplciemente"
        print("identificato primo grado")
    else:
        A,B = sistema(equations['y2'],equations['y1'],equations['y'],equations['u'])
        G1 = secondDegree(A,B)

        print("identificato secondo grado")
        auto_val_1_1,auto_val_1_2  = autovalori(equations['y'],equations['y1'])
        #print(auto_val_1_1, "----",auto_val_1_2)
        auto_val = str(auto_val_1_1) + ", " + str(auto_val_1_2)
        auto_val_1_1,auto_val_1_2 = stability(auto_val_1_1,auto_val_1_2,equations['y1'],equations['y'])

        if float(auto_val_1_1) < 0 and float(auto_val_1_2)< 0:
            stabilita1 = "Asintoticamente stabile"
        elif float(auto_val_1_1) > 0 or float(auto_val_1_2) > 0:
            stabilita1 = "Instabile"
        else:
            stabilita1 = "Stabile semplciemente"
    return G1, auto_val, stabilita1, A,B





def schema1_evaluate(equations,time,input):
    G1, auto_val, stabilita1, A,B = choose_system(equations["G1"])
    vettore_tempi = []
    vettore_output = []

    t = 0
    delta_t = 1e-3
    while t <= int(time):
        y = G1.evaluate(int(input),delta_t)
        vettore_tempi.append(t)
        vettore_output.append(float(y))
        t = t + delta_t

    return vettore_tempi, vettore_output, auto_val, stabilita1


def schema2_evaluate(equations,time,input):

    G1,auto_val1,stabilita1,A1,B1 = choose_system(equations['G1'])
    
    G2,auto_val2,stabilita2,A2,B2 = choose_system(equations['G2'])

    vettore_tempi = []
    vettore_output = []
    t = 0
    delta_t = 1e-3
    while t <= int(time):
        g1_out = G1.evaluate(int(input),delta_t)
        y = G2.evaluate(g1_out,delta_t)
        vettore_tempi.append(t)
        vettore_output.append(float(y))
        t = t + delta_t

    return vettore_tempi, vettore_output, auto_val1, auto_val2, stabilita1, stabilita2


def schema2_evaluate_controller(equations,time,input,controller):

    if(controller['type'] == 'PI'):
        ctrl = PID(float(controller['kp']),float(controller['ki']),0)
    elif(controller['type'] == 'PI +Sat'):
        ctrl = PIDSat(float(controller['kp']),float(controller['ki']),0,float(controller['sat']))
    elif(controller['type'] == 'PID'):
        ctrl = PID(float(controller['kp']),float(controller['ki']),float(controller['kd']))
    elif(controller['type'] == 'PID + Sat'):
        ctrl = PIDSat(float(controller['kp']),float(controller['ki']),float(controller['kd']),float(controller['sat']))        
    
    
    len_ref = len(controller["ref"])
    print("Lunghezza ref: ", len_ref) 
    if(len_ref == 2):
        ref = reference2()
    elif(len_ref == 3):
        ref = reference3()
    elif(len_ref == 4):
        ref = reference4()

    G1,auto_val1,stabilita1,A1,B1 = choose_system(equations['G1'])

    G2,auto_val2,stabilita2,A2,B2 = choose_system(equations['G2'])
    
    ref_array = [] #PID
    vettore_tempi = []
    vettore_output = []
    t = 0
    delta_t = 1e-3
    y = 0
    while t <= int(time):
        ref_signal = ref.evaluate(t,controller["ref"])
        error = ref_signal - y
        controller_output = ctrl.evaluate(error, delta_t)
        
        
       # g1_out = G1.evaluate(controller_output,delta_t)
       # y = G2.evaluate(g1_out,delta_t)
        y = G2.evaluate(G1.evaluate(controller_output,delta_t),delta_t)
        ref_array.append(ref_signal) #PID
        vettore_tempi.append(t)
        vettore_output.append(float(y))
        t = t + delta_t
    
    return vettore_tempi, vettore_output, ref_array, auto_val1, auto_val2, stabilita1, stabilita2

def schema1_evaluate_controller(equations,time,input,controller):

    if(controller['type'] == 'PI'):
        ctrl = PID(float(controller['kp']),float(controller['ki']),0)
    elif(controller['type'] == 'PI +Sat'):
        ctrl = PIDSat(float(controller['kp']),float(controller['ki']),0,float(controller['sat']))
    elif(controller['type'] == 'PID'):
        ctrl = PID(float(controller['kp']),float(controller['ki']),float(controller['kd']))
    elif(controller['type'] == 'PID + Sat'):
        ctrl = PIDSat(float(controller['kp']),float(controller['ki']),float(controller['kd']),float(controller['sat']))

    len_ref = len(controller["ref"])
    print("Lunghezza ref: ", len_ref)
    if len_ref == 1:
        ref = reference1()
    elif(len_ref == 2):
        ref = reference2()
    elif(len_ref == 3):
        ref = reference3()
    elif(len_ref == 4):
        ref = reference4()

    G1, auto_val1, stabilita1, A,B = choose_system(equations["G1"])
    vettore_tempi = []
    vettore_output = []
    delta_t = 1e-3
    y = 0
    t = 0
    ref_array = []
    while t <= int(time):
        ref_signal = ref.evaluate(t,controller["ref"])
        print(ref_signal)
        error = ref_signal - y
        controller_output = ctrl.evaluate(error, delta_t)
        y = G1.evaluate(controller_output,delta_t)
        ref_array.append(ref_signal) #PID
        vettore_tempi.append(t)
        vettore_output.append(float(y))
        t = t + delta_t

    return vettore_tempi, vettore_output, ref_array, auto_val1, stabilita1



def schema3_evaluate_controller(equations,time,input,controller):

    if(controller['type'] == 'PI'):
        ctrl = PID(float(controller['kp']),float(controller['ki']),0)
    elif(controller['type'] == 'PI +Sat'):
        ctrl = PIDSat(float(controller['kp']),float(controller['ki']),0,float(controller['sat']))
    elif(controller['type'] == 'PID'):
        ctrl = PID(float(controller['kp']),float(controller['ki']),float(controller["kd"]))
    elif(controller['type'] == 'PID + Sat'):
        ctrl = PIDSat(float(controller['kp']),float(controller['ki']),float(controller['kd']),float(controller['sat']))
    
    len_ref = len(controller["ref"])
    if len_ref == 1:
        ref = reference1()
    elif(len_ref == 2):
        ref = reference2()
    elif(len_ref == 3):
        ref = reference3()
    elif(len_ref == 4):
        ref = reference4()
    
    G1, auto_val1, stabilita1, A,B = choose_system(equations["G1"])
    G2, auto_val2, stabilita2, A2,B2 = choose_system(equations["G2"])
    G3, auto_val3, stabilita3, A3,B3 = choose_system(equations["G3"])

    vettore_tempi = []
    vettore_output = []
    delta_t = 1e-3
    y = 0
    t = 0
    ref_array = []
    out_G3= 0
    while t <= int(time):
        ref_signal = ref.evaluate(t,controller["ref"]) 
        error = ref_signal - y
        controller_output = ctrl.evaluate(error, delta_t)
        out_G1 = G1.evaluate(controller_output,delta_t)
        out_G2 = G2.evaluate(controller_output - out_G3,delta_t)
        out_G3 = G3.evaluate(out_G1 + out_G2, delta_t)
        y = out_G1 + out_G2
        ref_array.append(ref_signal) #PID
        vettore_tempi.append(t)
        vettore_output.append(float(y))
        t = t + delta_t
    return vettore_tempi, vettore_output, ref_array, auto_val1, auto_val2, auto_val3, stabilita1, stabilita2, stabilita3
