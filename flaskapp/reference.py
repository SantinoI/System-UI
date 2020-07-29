
import operator
from math import sqrt
class reference2:
    def __init__(self):
        pass
    def evaluate(self, t, ref):
        ops = {
            '+' : operator.add,
            '-' : operator.sub,
            '*' : operator.mul,
            '/' : operator.truediv, 
            '%' : operator.mod,
            '^' : operator.xor,
            '<': operator.lt,
            '>': operator.gt,
            '>=':  operator.ge,
            '<=': operator.le,
            '=': operator.eq,
        }
        
        if(ops[ref["ref-1"]["op"]]( t, float(ref["ref-1"]['n2']) )):
            return eval(ref["ref-1"]["ret"])
        elif(ops[ref["ref-2"]["op"]]( t, float(ref["ref-2"]['n2']) )):       
            return eval(ref["ref-2"]["ret"])

class reference3:
    def __init__(self):
        pass
    def evaluate(self, t, ref):
        ops = {
            '+' : operator.add,
            '-' : operator.sub,
            '*' : operator.mul,
            '/' : operator.truediv, 
            '%' : operator.mod,
            '^' : operator.xor,
            '<': operator.lt,
            '>': operator.gt,
            '>=':  operator.ge,
            '<=': operator.le,
            '=': operator.eq,
        }

        if(ops[ref["ref-1"]["op"]]( t, float(ref["ref-1"]['n2']) )):
            return eval(ref["ref-1"]["ret"])
        elif(ops[ref["ref-2"]["op"]]( t, float(ref["ref-2"]['n2']) )):
            return eval(ref["ref-2"]["ret"])
        elif(ops[ref["ref-3"]["op"]]( t, float(ref["ref-3"]['n2']) )):
                return eval(ref["ref-3"]["ret"])

class reference4:
    def __init__(self):
        pass
    def evaluate(self, t, ref):
        ops = {
            '+' : operator.add,
            '-' : operator.sub,
            '*' : operator.mul,
            '/' : operator.truediv,
            '%' : operator.mod,
            '^' : operator.xor,
            '<': operator.lt,
            '>': operator.gt,
            '>=':  operator.ge,
            '<=': operator.le,
            '=': operator.eq,
        }

        if(ops[ref["ref-1"]["op"]]( t, float(ref["ref-1"]['n2']) )):
            return eval(ref["ref-1"]["ret"])            
        elif(ops[ref["ref-2"]["op"]]( t, float(ref["ref-2"]['n2']) )):
            return eval(ref["ref-2"]["ret"])
        elif(ops[ref["ref-3"]["op"]]( t, float(ref["ref-3"]['n2']) )):
                return eval(ref["ref-3"]["ret"])
        elif(ops[ref["ref-4"]["op"]]( t, float(ref["ref-4"]['n2']) )):
                return eval(ref["ref-4"]["ret"])


