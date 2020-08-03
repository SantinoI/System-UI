import numpy
from sympy import *

class firstDegree:
    def __init__(self,a,b):
        self.y = 0
        self.a = a
        self.b = b
    def evaluate(self, u, delta_t):
        new_y = self.y * (self.a * delta_t + 1)  + self.b * delta_t * u
        self.y = new_y
        return self.y

class secondDegree:
    def __init__(self,A,B):
        self.x1 = 0
        self.x2 = 0
        self.A = A
        self.B = B
    def evaluate(self, u, delta_t1):
        expr =self.A[1] 
        delta_t_val = expr.evalf(subs = {self.A[1]: delta_t1}) 
        temp_x1 = self.x1 * self.A[0] + delta_t_val * self.x2
        
        A1_10 = self.A[2] 
        A1_10 =  A1_10.evalf(subs = {self.A[1]: delta_t1})

        A1_11 = self.A[3]
        A1_11 =  A1_11.evalf(subs = {self.A[1]: delta_t1})

        B1_01 = self.B[1]
        B1_01 =  B1_01.evalf(subs = {self.A[1]: delta_t1})
       
        op1 = A1_10 * self.x1
        op2 = A1_11 * self.x2
        op3 = u * B1_01
        temp_x2 = op1 + op2 + op3
        self.x1 = temp_x1
        self.x2 = temp_x2
        output = self.x1
        return output

def sistema(y2,y1,y,u):
    #print(y2,y1,y,u)
    delta_t = symbols('delta_t')
    a = Matrix([[0,1],[y,y1]])
    b = Matrix([0, u])
    i = Matrix([[1, 0], [0, 1]])
    a_deltaT = a*delta_t
    a_deltaT_I = a_deltaT+i
    b_deltaT = b*delta_t
    return a_deltaT_I, b_deltaT

def autovalori(y,y1):
    A = Matrix([[0,1],[y,y1]])
    lamb = symbols('lamb')
    lamb_I = Matrix([[lamb,0],[0,lamb]])
    aut = lamb_I - A
    #print(aut)
    determinante = det(aut)
    return solveset(Eq(determinante,0))

def division(da_dividere):
    argomento_1 = da_dividere.split("/")[0]
    argomento_2 = da_dividere.split("/")[1]
    return int(argomento_1) / int(argomento_2)

def stability(aut1,aut2,y1,y):
    aut1 = str(aut1)
    aut2 = str(aut2)
    aut1 = aut1.split()[0]
    if(float(y1) < 0 and float(y) > 0 and " " in aut2):  
        aut2 = aut2.rsplit(" ",1)[1]
    else:
        aut2 = aut2.split()[0]
    #print(aut2)    
    if ("/" in aut1):
        aut1 = division(aut1)
    else:
        aut1 = float(aut1)
    if ("/" in aut2):
        aut2 = division(aut2)
    else:
        aut2 = float(aut2)
    return aut1,aut2

def stability1(aut1):
    aut1 = str(aut1)
    aut1 = aut1.split()[0]  
    if ("/" in aut1):
        aut1 = division(aut1)
    else:
        aut1 = float(aut1)
    return aut1

