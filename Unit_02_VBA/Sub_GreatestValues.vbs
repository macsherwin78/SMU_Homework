'This should be run last. This will create the Summary table


Sub GreatestValues()

    Dim ws As Worksheet
 
    'Loop through all the worksheets
    For Each ws In Worksheets
        
        'declare variables for Greatest Total Volume
        Dim TickerGreatestTotalVol As String
        Dim GreatestTotalVol As Double
        GreatestTotalVol = 0
        
        'declare variables for Greatest Percent Increase
        Dim TickerGreatestPercentInc As String
        Dim GreatestPercentInc As Double
        GreatestPercentInc = 0
        
        'declare variables for Greatest Percent Decrease
        Dim TickerGreatestPercentDec As String
        Dim GreatestPercentDec As Double
        GreatestPercentDec = 0
        
        'Parse the last column in column 10
        Dim last_row As Long
        last_row = ws.Cells(Rows.Count, 10).End(xlUp).Row
        
            For Row = 2 To last_row
                    
                    'compare Volume values of row and row+1
                    If GreatestTotalVol < ws.Cells(Row, 12).Value Then
                        GreatestTotalVol = ws.Cells(Row, 12).Value
                        TickerGreatestTotalVol = ws.Cells(Row, 9).Value
                    End If
                    
                    'Look for the highest value in Percent Change Column
                    If GreatestPercentInc < ws.Cells(Row, 11).Value Then
                        GreatestPercentInc = ws.Cells(Row, 11).Value
                        TickerGreatestPercentInc = ws.Cells(Row, 9).Value
                    End If
                    
                    'Look for the lowest value in Percent Change Column
                     If GreatestPercentDec > ws.Cells(Row, 11).Value Then
                        GreatestPercentDec = ws.Cells(Row, 11).Value
                        TickerGreatestPercentDec = ws.Cells(Row, 9).Value
                    End If
                    
            
            Next Row
            
            'Create the table per worksheet
            ws.Range("P1") = "Ticker"
            ws.Range("Q1") = "Value"
            ws.Range("O2") = "Greatest % Increase"
            ws.Range("O3") = "Greatest % Decrease"
            ws.Range("O4") = "Greatest Total Volume"
            
            ws.Range("P1:Q1").Font.FontStyle = "Bold"
            ws.Range("P1:Q1").Font.Size = 14
            ws.Range("O2:O4").Font.FontStyle = "Bold"
            ws.Range("O2:O4").Font.Size = 14
            ws.Range("O2:Q2").Interior.ColorIndex = 4
            ws.Range("O3:Q3").Interior.ColorIndex = 3
            
            'display values:
            ws.Range("P2") = TickerGreatestPercentInc
            ws.Range("Q2") = GreatestPercentInc
            ws.Range("Q2").NumberFormat = "0.00%"
        
            ws.Range("P3") = TickerGreatestPercentDec
            ws.Range("Q3") = GreatestPercentDec
            ws.Range("Q3").NumberFormat = "0.00%"
            
            ws.Range("P4") = TickerGreatestTotalVol
            ws.Range("Q4") = GreatestTotalVol
    
    Next

End Sub
