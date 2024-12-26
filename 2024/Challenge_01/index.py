def get_access_code(code, rules):
    code_arr = list(code)
    position = 0
    rules_arr = list(rules)

    for rule in rules:
        if(rule == "R"):
            if(position >= len(code_arr) - 1):
                position = 0
            else:
                position += 1
        elif(rule == "L"):
            if(position <= 0):
                position = len(code_arr) - 1
            else:
                position -= 1
        elif(rule == "U"):
            if(int(code_arr[position]) == 9):
                code_arr[position] = "0"
            else:
                code_arr[position] = str(int(code_arr[position]) + 1)
        elif(rule == "D"):
            if(int(code_arr[position]) <= 0):
                code_arr[position] = "9"
            else:
                code_arr[position] = str(int(code_arr[position]) - 1)
            
        
    print("".join(code_arr))


f = open("./assets/2024/Challenge_01/code.txt", "r")
file_text = f.read()
text_arr = file_text.split(" ")
code = text_arr[0]
rules = text_arr[1]

# EXAMPLES
# get_access_code("000", "URURD") # 119
# get_access_code("1111", "UUURUUU") # 4411
# get_access_code("9999", "LULULULD") # 8000

# RESPONSE
get_access_code(code, rules)