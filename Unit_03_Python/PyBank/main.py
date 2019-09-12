# Modules
import os
import csv
import numpy as np

# Set path for csv
csvpath = '/Users/macsherwin/Documents/SMU/homework/Unit_03_Python/PyBank/budget_data.csv'

# Set path for output txt file
file = open('/Users/macsherwin/Documents/SMU/homework/Unit_03_Python/PyBank/budget.txt', 'w+')

# Lists to store data
Profit_losses = []
Date = []
Adjusted_Profit_Losses = []

# Open the CSV
with open(csvpath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")
    next(csvreader)
    
    for row in csvreader:

        # Add Date
        Date.append(row[0])

        # Add Profit/Losses
        Profit_losses.append(int(row[1]))
    
    # CReate a new List of Adjusted values per index
    Adjusted_Profit_Losses = Profit_losses.copy()
    Adjusted_Profit_Losses.pop(0)
    Adjusted_Profit_Losses.append(0)

# Prints Header
    print("Financial Analysis")
    print("----------------------------")

# The total number of months included in the dataset
    total_num_mos = int(len(Date))
    print(f"Total Months: {total_num_mos}")

# The net total amount of "Profit/Losses" over the entire period
    total_amount = 0

    for row in Profit_losses:
        total_amount += int(row)
    
    print(f"Total: ${total_amount}")

# The average of the changes in "Profit/Losses" over the entire period

    # Creating a list from a nparray 
    Difference = list(np.subtract(Adjusted_Profit_Losses,Profit_losses))
    # deleting the last entry since no comparison
    Difference.pop()

    Average_Change = (sum(Difference)/85)
    print(f"Average  Change: ${Average_Change}")

# The greatest increase in profits (date and amount) over the entire period

    Greatest_Increase = max(Difference)

    G_Inc_Index = (Difference.index(Greatest_Increase)+1) 
    G_Inc_Date = Date[G_Inc_Index]

    print(f"Greatest Increase in Profits: {G_Inc_Date} (${Greatest_Increase})")

# The greatest decrease in losses (date and amount) over the entire period

    Greatest_Decrease = min(Difference)

    G_Dec_Index = (Difference.index(Greatest_Decrease)+1)
    G_Dec_Date = Date[G_Dec_Index]

    print(f"Greatest Decrease in Profits: {G_Dec_Date} (${Greatest_Decrease})")


    # writes to txt file
    file.write("Financial Analysis\n")
    file.write("----------------------------\n")
    file.write(f"Total Months: {total_num_mos}\n")
    file.write(f"Total: ${total_amount}\n")
    file.write(f"Average  Change: ${Average_Change}\n")
    file.write(f"Greatest Increase in Profits: {G_Inc_Date} (${Greatest_Increase})\n")
    file.write(f"Greatest Decrease in Profits: {G_Dec_Date} (${Greatest_Decrease})\n")

file.close()