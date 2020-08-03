import re

if __name__ == "__main__":
    ss={
        "1":"G1(u+2)",
        "2":"G2(G1-33)",
    }
    for attr, value in ss.items():
        origine = value.split("(")[0]
        arguments = value.split("(")[1].replace(")","")
        arguments = arguments.replace("+"," +")
        arguments = arguments.replace("-"," -")
        arguments = arguments.split(" ")
        print(value)
        print(origine)
        print(arguments)

        