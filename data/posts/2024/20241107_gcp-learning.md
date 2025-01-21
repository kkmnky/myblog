---
title: Google Skill Boost（基礎編）
date: 2024-11-07
summary: Google Skill BoostでGoogle Cloud Infrastructure for AWS professionalsというLearning Pathの概要や感想、学習記録
tags:
  - label: GoogleCloud
---

## はじめに

前回の執筆からだいぶ時間が経ってしまいました。仕事やプライベートなどなどで色々とありまして。。それでも妻の協力もあって細々と勉強しています。

今回は[Google Cloud Skills Boost](https://www.cloudskillsboost.google)というGCPの学習サイトを使って学習した記事になります。こちらはGoogleが出しているYoutube動画、資料、QuickLabsというハンズオンでGCPに関わらずクラウドに必要な知識を学習できるサイトです。QuickLabsについては以前コーセラという学習サイトで使ったことがあり、自分のGCP環境を汚すことなく利用できることが便利です。ただ、有料なので利用する際は集中して利用しましょう。

ログインすると、Course・Lab・Learning Pathの3つが出てきます。

- Course
  - Youtubeや各資料で基礎学習をする。
  - Youtubeは最後まで見たら、資料はリンクをクリックしたら学習完了になる
- Lab
  - 一定の時間だけGoogleアカウントが発行されGCP環境を利用できる
  - 手順通りに実施してリソースなどを作成し、正しく作成されているかなどをチェックして、すべてのチェックが完了し、ラボを終了すると完了になる
- Learning Path
  - あるテーマに沿ったCourseとLabの組み合わせ
  - 全てを受講すると完了になる

CourseやLabを単独で探しても、Learning Pathでセットで学習しても良いようになっています。

今回は「Google Cloud Infrastructure for AWS professionals」というLearning Pathを紹介します。最近インフラ領域を広げるためにGCPの勉強をしたいと思い、基礎学習ができる教材を探していました。その中でAWSと関連づけた方が覚えやすいとおもい本教材にしました。

なお、私のクラウドスキルレベルは以下の通りです。

- GCPを触ったことはあるが、業務でそこまで利用していない
- GCPの資格なし
- AWSを業務で触っている

## Google Cloud Infrastructure for AWS professionals

こちらのLearning Pathは5つのコースで成り立っています。

### Google Cloud IAM and Networking for AWS Professionals

こちらはGCPの基礎となるIAMとVPCに関する学習です。 こちらは触ったことがあるため軽いおさらい程度でした。ラボもIAMで権限を付与したり剥奪したり、VPCを作成したりと難しくないと思います。以降のコースもそうですが、各説明にAWSとGCPの比較表があり、さらにGCPはAWSと違ってここが違いますよと解説してくれているのでとてもわかりやすかったです。

### Google Cloud Compute and Scalability for AWS Professionals

こちらはクラウドの基礎となるVMとスケールするためのロードバランサの紹介になります。最も印象の残ったのはロードバランサの選択です。

- Golbal HTTP : 外部かつHTTP/HTTPSのロードバランス
- Global SSL Proxy : 外部かつTCPかつSSLオフロードが必要
- Global TCP Proxy : 外部かつTCPかつSSLオフロード不要
- Regional Network : UDPもしくは、クライアントIPを保持したい場合、ただしIPv6は対応していない
- Internal TCP/UDP : 内部のTCPもしくはUDPのロードバランス
- Internal HTTP : 内部のHTTP/HTTPSのロードバランス

また、VMのマシンファミリーの選択もAWSと同じく大変ですよね。

- 汎用はEシリーズかNシリーズ
- ゲーミングなどハイパフォーマンスが必要なものはCシリーズ
- DBなどメモリが必要なものはMシリーズ
- 機械学習といった並列計算が必要なものはAシリーズ

### Google Cloud Storage and Containers for AWS Professionals

ストレージについては以下のようなイメージで覚えればほぼOK。データ分析については疎いのでした2つはふーん程度で終わってしまいました。でもBigQueryはGCPでとても有名なサービスなので今後触っていきたいです。

- Cloud SQL -> RDS
- Spanner -> Aurora
- Bigtable -> DynamoDB （NoSQL）
- Dataflow, Cloud Data Fusion -> AWS Lake Formation, AWS Glue
- Dataproc, BigQuery -> Amazon EMR, Amazon Redshift, Amazon Athena

もう一つコンテナの章もありますが、コンテナというよりはGKEすなわちkubernetesについてです。k8sは以前少し触ったことがあるのと、直近使う予定がないので軽く流して終わりました。

### Deploy and Monitor in Google Cloud for AWS Professionals

前半のデプロイはいわばCloud Runに関するコースです。Cloud RunもGCPで有名なサービスで触りたかったのでちょうどよかったです。 AWSでいうECSだけでなく、デプロイまでしてくれるので便利ですね。

もう一つはMonitoring、ただこちらはGKEベースのモニタリングだったので軽く流しました。

### Build Google Cloud Infrastructure for AWS Professionals

これはラボだけで構成されているコースです。今まで学んだ4つのコースの知識を使って、案内少なめで自分で考えてリソースを作成してみるので、復習に最適だと思います。

## まとめ

以上、GCPのインフラ初心者向けのコースでした。単純計算で45時間のコースですが、ラボですぐ終わるものもあるので1週間あれば十分なコースです。途中自分のメモも兼ねて書いた通り、リソースの選択方法やAWSのサービスとの比較が良かったです。AWSとの関連付けが入っていない基礎コースが別途ありますが、こちらのコースは最低限必要な知識に絞っていて短時間で学習ができるので、もしAWSの知識があるのであれば私はこちらをお勧めします。

他にもGCPのコースの学習を進めているので、適宜備忘録がてらにアップロードします。興味がある方はお待ちください。ちなみにGCPの資格勉強も考えはしたのですが、更新が面倒なので諦めました。ただ、資格試験用のラーニングパスもありますし、この学習である程度カバーできると思うので、この記事を読んで興味を持った方はぜひ資格試験を受けてみてください。

最後まで読んでいただきありがとうございました。