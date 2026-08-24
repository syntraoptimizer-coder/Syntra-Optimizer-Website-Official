Get-NetTCPConnection -State Listen | Where-Object { $_.LocalPort -lt 4000 } | Select-Object LocalAddress,LocalPort,OwningProcess | Format-Table -AutoSize
