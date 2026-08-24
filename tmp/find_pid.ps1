$conn = Get-NetTCPConnection -LocalPort 60618 -State Listen -ErrorAction SilentlyContinue
if ($conn) {
    $pid = $conn.OwningProcess
    Write-Host "PID: $pid"
    Get-Process -Id $pid -ErrorAction SilentlyContinue | Select-Object Id,ProcessName,StartTime
} else {
    Write-Host "No listener on 60618"
}
