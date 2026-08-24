$htmlPath = 'C:\Users\Luro\Downloads\localhost-1787507174554\index.html'
$cssPath = 'C:\Users\Luro\Downloads\localhost-1787507174554\styles\5Broot-of-the-server-5D__11g8-72._.css'
$html = Get-Content -Raw -Encoding UTF8 $htmlPath
$css = Get-Content -Raw -Encoding UTF8 $cssPath
$patterns = @(
  'sKagWkDxQRf4BvA8z6unUgVYCkA',
  'GVpGfMQmO0bkhhLvW3Hf7wKAhg',
  'SErCuF2ZxVhJBfxCTxJS7WpIQJQ',
  'Optimize your PC',
  'Avg FPS boost',
  'data-framer-name="Hero"',
  'data-framer-name="Stats"',
  'data-framer-name="Syntra dashboard"'
)
foreach ($pattern in $patterns) {
  Write-Output "===== $pattern ====="
  $idx = $html.IndexOf($pattern)
  if ($idx -ge 0) {
    $start = [Math]::Max(0, $idx - 1400)
    $len = [Math]::Min(3600, $html.Length - $start)
    Write-Output $html.Substring($start, $len)
  } else { Write-Output 'HTML: not found' }
  $cssIdx = $css.IndexOf($pattern)
  if ($cssIdx -ge 0) {
    $start = [Math]::Max(0, $cssIdx - 700)
    $len = [Math]::Min(1800, $css.Length - $start)
    Write-Output 'CSS:'
    Write-Output $css.Substring($start, $len)
  } else { Write-Output 'CSS: not found' }
}
