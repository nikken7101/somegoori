# 染め氷

おなじみのあの市販シロップを使い、どんな色のかき氷も楽しめるようにしました。デジタル制御でCMYKにあたる4色をミックスし、美しく染まってゆきます。

子供たちにとっては、どんな色も生み出せる3原色との出逢いになるかもしれません。

video: https://www.youtube.com/watch?v=3Vbqvm6Y-rU

# 動作手順 (ver 201607)

## Raspberry Pi とコントローラの起動
- ポケットWi-Fiを起動
- Raspiに電源を接続
- MacでポケットWi-Fiに接続する
	- IP アドレスは固定してあるので `192.168.128.124` になる
- Mac で `ssh pi@192.168.128.124` 
- `cd $somegoori_root`
- `sudo node index.js`
- iPhoneも同じWi-Fiにつなぎ、ブラウザで `http://192.168.128.124:3000/` にアクセス
- ホーム画面においておけば、アドレスバーは消える
- `http://192.168.128.124:3000/simple` だとシンプルバージョンに行ける

## 配線
- RasPiのGNDがブレッドボードのGNDにつながっていることを確認
- ブレッドボードにモバブーから電源を接続
- ポンプと配線を接続する
	- ポンプの+側 (白い線のついていない方) は、5Vからでているモノトーン系の線の４本のうちどれかにつなぐ
	- ポンプの-側は、色に対応する線につなぐ
- **注意**: 1つのポンプだけ配線が誤っている (修正済み?) ので、要チェック 

## ポンプの動作
- コントローラーの色相環をタップすると、その色に近い色が出る
- 下部のRainbowボタンを押すと、レインボーカラーが連続で出る
- 色のリスト
	- BLUE
	- ORANGE
	- BLACK
	- RED
	- PURPLE
	- YELLOW
	- DARK_GREEN
	- GREEN
	- OUDO
	- PINK 

## トラブルシューティング
- コントローラーで操作しようとするとErrorでnodeが落ちる
	- 再起動したら直った
- 2回めに`sudo node index.js` と打ったら、エラーっぽい表示 (下記) が出る
	- 放っておいて大丈夫です
```
{ [Error: EBUSY, resource busy or locked] errno: -16, code: 'EBUSY', syscall: 'write' }
{ [Error: EBUSY, resource busy or locked] errno: -16, code: 'EBUSY', syscall: 'write' }
{ [Error: EBUSY, resource busy or locked] errno: -16, code: 'EBUSY', syscall: 'write' }
{ [Error: EBUSY, resource busy or locked] errno: -16, code: 'EBUSY', syscall: 'write' }
```
- ポンプの出力の強さを変えたい
	- 全体的に変更したい
		-  `index.html` (simpleコントローラの場合は`index_simple.html`) の `var ONE_PUSH_DURATION = 1500;` の値を変更してください
	- 特定の値だけ変えたい
		- `index.html` (simpleコントローラの場合は`index_simple.html`) の `var ORANGE = [[PUMP_MAGENTA, 0, 0.3 * ONE_PUSH_DURATION], [PUMP_YELLOW, 0, 0.8 * ONE_PUSH_DURATION]];` の `0.3` などの比率を調整してください
