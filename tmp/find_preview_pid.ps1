$conn = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if ($conn) {
  $owner = $conn.OwningProcess
  Write-Host "Listening PID: $owner"
  Get-Process -Id $owner -ErrorAction SilentlyContinue | Select-Object Id,ProcessName,StartTime
} else {
  Write-Host "No listener on port 3000"
}
