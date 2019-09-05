'This should be run first


Sub SumStocks()

    Dim ws As Worksheet
    
    'Loop through all the worksheets
    For Each ws In Worksheets
    
        'Declaring Rows and Columns
        Dim DispRow As Integer
        Dim DispTickerCol As Integer
        Dim DispTotalStockVolumeCol As Integer
        Dim DispYearlyChangeCol As Integer
        Dim DispPercentChangeCol As Integer
        Dim OpeningValueRowLoc As Long
        
        
        'Declaring Values to parse
        Dim OpeningValue As Double
        Dim ClosingValue As Double
        
        'Declaring Values to compute
        Dim TotalStockVolume As Double
        Dim YearlyChange As Double
        Dim PercentChange As Double
        Dim TotalNumTransaction As Integer
        
        'declaring, parsing and assigning last row
        Dim last_row As Long
        last_row = ws.Cells(Rows.Count, 1).End(xlUp).Row
        
        'Initializing Values
        DispRow = 2
        DispTickerCol = 9
        DispYearlyChangeCol = 10
        DispPercentChangeCol = 11
        DispTotalStockVolumeCol = 12
        OpeningValueRowLoc = 0
        
        OpeningValue = 0
        ClosingValue = 0
        
        TotalStockVolume = 0
        YearlyChange = 0
        PercentChange = 0
        
        TotalNumTransaction = 0

        For Row = 2 To last_row
            
            If ws.Cells(Row, 1).Value = ws.Cells(Row + 1, 1).Value Then
                TotalNumTransaction = TotalNumTransaction + 1
                TotalStockVolume = TotalStockVolume + ws.Cells(Row, 7).Value
                OpeningValueRowLoc = Row - (TotalNumTransaction - 1)
                
                
            Else
            
                'adding the last value
                 TotalStockVolume = TotalStockVolume + ws.Cells(Row, 7).Value
                 TotalNumTransaction = TotalNumTransaction + 1
                
                'saving the Closing Value of a stock
                ClosingValue = ws.Cells(Row, 6).Value
                
                'saving Opening Value of the next stock
                OpeningValue = ws.Cells(OpeningValueRowLoc, 3).Value
                
                'calculating the yearly Change
                YearlyChange = (ClosingValue - OpeningValue)
                
                'displaying the Percent Change
                    If OpeningValue > 0 Then
                    
                        PercentChange = (YearlyChange / OpeningValue)
                        
                    Else
                    
                        PercentChange = 0
                    
                    End If
                    
                'displaying Ticker Type
                ws.Cells(DispRow, DispTickerCol).Value = ws.Cells(Row, 1).Value
                
                'displaying Total Stock Volume
                ws.Cells(DispRow, DispTotalStockVolumeCol).Value = TotalStockVolume
            
                'displaying the yearly Change
                ws.Cells(DispRow, DispYearlyChangeCol).Value = YearlyChange
                
                'displaying the Percent Change
                ws.Cells(DispRow, DispPercentChangeCol).Value = PercentChange
                ws.Cells(DispRow, DispPercentChangeCol).NumberFormat = "0.00%"
                
                'Write headers
                ws.Range("I1").Value = "Ticker"
                ws.Range("J1").Value = "Yearly Change"
                ws.Range("K1").Value = "Percent Change"
                ws.Range("L1").Value = "Total Stock Volume"
                ws.Range("I1:L1").Font.FontStyle = "Bold"
                
                'Moving the Summarry table's row
                DispRow = DispRow + 1
                
                'Resetting TotalCharge
                TotalStockVolume = 0
                TotalNumTransaction = 0
                OpeningValue = 0
                ClosingValue = 0
                YearlyChange = 0
                PercentChange = 0
                OpeningValueRowLoc = 0
                
                
            End If
    
        Next Row

    ws.Columns("I:L").AutoFit
    
    Next
    
    
End Sub
