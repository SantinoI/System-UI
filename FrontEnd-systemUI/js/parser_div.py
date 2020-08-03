def division(da_dividere):
    argomento_1 = da_dividere.split("/")[0]
    argomento_2 = da_dividere.split("/")[1]
    return int(argomento_1) / int(argomento_2)
    


if __name__ == "__main__":
    
    print(division("-3/2"))