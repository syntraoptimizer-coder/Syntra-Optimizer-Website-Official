$conn = Get-NetTCPConnection -LocalPort 60618 -State Listen -ErrorAction SilentlyContinue
if ($conn) {
    $p = $conn.OwningProcess
    Write-Host "Listening PID: $p"
    Get-Process -Id $p -ErrorAction SilentlyContinue | Select-Object Id,ProcessName,StartTime
} else {
    Write-Host "No listener on 60618"
}
