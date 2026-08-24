$cssPath = 'C:\Users\Luro\Downloads\localhost-1787507174554\styles\5Broot-of-the-server-5D__11g8-72._.css'
$htmlPath = 'C:\Users\Luro\Downloads\localhost-1787507174554\index.html'
$css = Get-Content -Raw -Encoding UTF8 $cssPath
$html = Get-Content -Raw -Encoding UTF8 $htmlPath
$classes = @('framer-cocp4s','framer-1p1h62x','framer-30645o','framer-1o76ql7-container','framer-yzlhc','framer-pd8pf9','framer-14fijya','framer-1iwe5k8','framer-1958v4b','framer-1eexnwz','framer-187tpbi','framer-cbwyg1','framer-14q2iw5-container','framer-15beo3h','framer-1rlvr66','framer-16il4xx','framer-mui88l','framer-u3hz74','framer-1dekqji','framer-pxby9p','framer-1q3fk4o','framer-117lqmc')
foreach ($class in $classes) {
  Write-Output "===== .$class CSS ====="
  $pattern = [regex]::Escape('.' + $class)
  $m = [regex]::Match($css, $pattern + '[^}]*\}')
  if ($m.Success) { Write-Output $m.Value } else { Write-Output 'not found' }
  Write-Output "===== .$class HTML ====="
  $idx = $html.IndexOf('class="' + $class)
  if ($idx -ge 0) { Write-Output $html.Substring([Math]::Max(0,$idx-100), [Math]::Min(1200,$html.Length-$idx+100)) } else { Write-Output 'not found' }
}
