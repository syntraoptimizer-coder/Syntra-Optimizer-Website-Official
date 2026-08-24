$paths = @(
  'C:\Users\Luro\Downloads\prospiratweaks.com-1787500243802\styles\prospira.css',
  'C:\Users\Luro\Downloads\prospiratweaks.com-1787500243802\styles\landing.css'
)
$patterns = @('header', 'data-nav-floating', '.announce', '.nav-pop', '.i18n', 'mobile-menu', '.nav-')
foreach ($path in $paths) {
  $text = Get-Content -Raw -Encoding UTF8 $path
  Write-Output "===== FILE $path ====="
  foreach ($pattern in $patterns) {
    Write-Output "--- $pattern ---"
    $matches = [regex]::Matches($text, '(?s)([^{}]*' + [regex]::Escape($pattern) + '[^{}]*)\{([^{}]*)\}')
    $count = 0
    foreach ($m in $matches) {
      Write-Output ($m.Value.Substring(0, [Math]::Min(1200, $m.Value.Length)))
      $count++
      if ($count -ge 12) { break }
    }
  }
}
