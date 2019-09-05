'This should be run second after sumStocks

Sub FillInCellColor()
    
    Dim ws As Worksheet
    
    'Loop through all the worksheets
    For Each ws In Worksheets
        
        'Parse the last column in column 10
        Dim last_row As Long
        last_row = ws.Cells(Rows.Count, 9).End(xlUp).Row
    
        Dim CurRowVal As Double
        CurRowVal = 0
     
            For Row = 2 To last_row
                
                CurRowVal = ws.Range("J" & Row).Value
                
                If CurRowVal > 0 Then
                    'FIll Color green
                    ws.Range("J" & Row).Interior.ColorIndex = 4
               
                Else
                    'FIll Color red
                    ws.Range("J" & Row).Interior.ColorIndex = 3
               
                End If
            
            Next Row
    
    Next

End Sub

