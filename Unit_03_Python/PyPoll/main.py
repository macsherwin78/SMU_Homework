# Modules
import os
import csv

# Set path for csv
csvpath = '/Users/macsherwin/Documents/SMU/homework/Unit_03_Python/PyPoll/election_data.csv'

# Set path for output txt file
file = open('/Users/macsherwin/Documents/SMU/homework/Unit_03_Python/PyPoll/election.txt', 'w+')

Voter_ID = []
County = []
Candidate = []

# Open the CSV
with open(csvpath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")
    next(csvreader)

    for row in csvreader:

        # Add Voter ID
        Voter_ID.append(row[0])

        # Add County
        County.append(row[1])

        # Add Candidate
        Candidate.append(row[2])
    

    # The total number and percentage of votes cast
    Vote_Count = int(len(Voter_ID))
 
    Khan_Count = Candidate.count("Khan")
    Khan_Percent = round((Khan_Count/Vote_Count)*100, 5)

    Correy_Count = Candidate.count("Correy")
    Correy_Percent = round((Correy_Count/Vote_Count)*100, 5)

    Li_Count = Candidate.count("Li")
    Li_Percent = round((Li_Count/Vote_Count)*100, 5)

    OTooley_Count = Candidate.count("O'Tooley")
    OTooley_Percent = round((OTooley_Count/Vote_Count)*100, 5)

    #display on terminal
    print("Election Results")
    print("----------------------------")
    print(f"Total Votes: {Vote_Count}")
    print("----------------------------")
    print(f"Khan: {Khan_Percent}% ({Khan_Count})")
    print(f"Correy: {Correy_Percent}% ({Correy_Count})")
    print(f"Li: {Li_Percent}% ({Li_Count})")
    print(f"O'Tooley: {OTooley_Percent}% ({OTooley_Count})")
    print("----------------------------")
    print("Winner: Khan")
    print("----------------------------")

    # writes to txt file
    file.write("Election Results\n")
    file.write("----------------------------\n")
    file.write(f"Total Votes: {Vote_Count}\n")
    file.write("----------------------------\n")
    file.write(f"Khan: {Khan_Percent}% ({Khan_Count})\n")
    file.write(f"Correy: {Correy_Percent}% ({Correy_Count})\n")
    file.write(f"Li: {Li_Percent}% ({Li_Count})\n")
    file.write(f"O'Tooley: {OTooley_Percent}% ({OTooley_Count})\n")
    file.write("----------------------------\n")
    file.write("Winner: Khan\n")
    file.write("----------------------------\n")

file.close()