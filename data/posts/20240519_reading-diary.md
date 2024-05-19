---
title: 動かして学ぶ Flutter開発入門
date: 2024-05-19
summary: 動かして学ぶFlutter開発入門に関する読書日記
tags:
  - 読書日記
  - Flutter
---

## はじめに

5月上旬の寒暖差にやられてうちの猫が体調を崩してしまいましたが、無事に回復しました。
病気になる前から良い病院を見つけておくのが大事ということを改めて痛感しました。

前置きはこのくらいにして、今回紹介する本は、翔泳社出版の "動かして学ぶ Flutter開発入門" です。（プログラムを動かしながらだったので前回の読書日記から時間が空いてしまいました）

![動かして学ぶ Flutter開発入門](https://m.media-amazon.com/images/I/81nK-EzK1RL._SY522_.jpg)
_[掛内一章　動かして学ぶ Flutter開発入門　 2023/5/17](https://www.amazon.co.jp/%E5%8B%95%E3%81%8B%E3%81%97%E3%81%A6%E5%AD%A6%E3%81%B6%EF%BC%81Flutter%E9%96%8B%E7%99%BA%E5%85%A5%E9%96%80-%E6%8E%9B%E5%86%85-%E4%B8%80%E7%AB%A0-ebook/dp/B0BYS182MV/ref=sr_1_1?crid=2EGRKZWB4D54Y&dib=eyJ2IjoiMSJ9.nPvz7-zI2AYVK_koVM_wSJj5pjCuY_giSRRPjr-CbRereVJvcvVDQ8vhdyYllwurwSUpumLVqKIgo23M3Mj1k5GsIPkjyukRjAFY-mJrSxjpFoT3M8AaHTiL3uZUFt1ijsOEpHfNogA1lAoET9XY9oi4-1Y1-WUthhsTx87kvF8-2se3NyF1RqanmxahEd4H7YRdvUJ2Z1_-sd7ISiOwFSoDNc3Kh8gPwrtqhmhLsNA.77ddco1wEhd7aHGsq7vRJ_vvCuO4ef6QcgKsaBfi-P8&dib_tag=se&keywords=%E5%8B%95%E3%81%8B%E3%81%97%E3%81%A6%E5%AD%A6%E3%81%B6+flutter%E9%96%8B%E7%99%BA%E5%85%A5%E9%96%80&qid=1716086558&s=amazon-devices&sprefix=%E5%8B%95%E3%81%8B%E3%81%97%E3%81%A6%E5%AD%A6%E3%81%B6%E3%80%80Flutter%2Camazon-devices%2C169&sr=1-1)_

業務を行うにあたってモバイルの知識が全くなく、SREとしてモバイルの非機能も担保できるようになりたいと思い、最近Flutterの勉強を始めています。言語を始めて勉強する際、まずはToDoアプリなどのサンプルアプリを作りながら概観を知るということが私の勉強法なので、目的に合った本を探した結果この本に至りました。

## 内容をかいつまんで

この本はZennの[Flutter実践入門](https://zenn.dev/kazutxt/books/flutter_practice_introduction)をもとにした本になります。

1章はお決まりのFlutterとはから始まり、環境構築、初期アプリ（カウンタアプリ）の起動になります。モバイルになると、Android/iOSエミュレータの導入が必要で、開発端末のOSの影響をもろ受けるため環境セットアップが大変でした。コンテナのありがたさを痛感していました。

2章はWidgetの使い方や画面の構築・更新を学ぶ章でした。ベースとなるカウンタアプリを修正しながら画面の構築・実装を学びます。ただし、アニメーションなどはコードの紹介だけでした。Widgetの書き方はWebとは全く異なり、慣れるのに時間がかかりました。その中でvscodeの補完機能がよく効いて便利でしたので、私のような初学者には拡張機能の導入をお勧めします。ちなみにもとObservability屋さんだった私としては、プロファイラを普通に取得してくれるのはすごいなと思いました。

3章はカメラやGPSなどのスマートフォンの機能を使う場合の事例紹介です。こちらは実践するというよりは読むだけにとどめました。

4章はFirebaseとの連携方法を解説しています。Authentication, Firestore, Storage, Hosting, Functions, Machine Learning, FCM, Crashlytics, Performance, AdMobを導入して学ぶことができます。Firebaseは無料で認証・通知などなど様々なことができてかなり便利でした。モバイルプロダクトでよくFirebaseを使用していてどのような関わり方をしているのだろうと不思議に思っていたので、実際に触れながらFirebaseによる実装方法について理解できたのはありがたいです。flutter-study.devと合わせて実践すると良かったです。

5章はアプリのリリースになります。GoogleもAppleも開発アカウントは有料なのでここは本を読むだけにとどめました。モバイルのリリースってどうやっているのだろう？と兼ねてからの疑問だったので、画面を載せながら解説してくれているのでイメージを掴むことができて良かったです。

6章はFlutterの仕組みについての解説です。Null Safety、非同期処理、ライフサイクル・ツリーあたりが印象に残っています。前半で書いていたコードを見直すとここはNull Safetyの書き方をしているのか、ライフサイクルを使いっているのかなどさらなる理解につながるので、この章を読んで復習してみるのはアリだと思います。

7章はデザインパターン、主にBLoCやProviderについて解説しています。別の学習でProviderを使うのは必須のようです。デザインパターンだけでなく、ディレクトリやファイルの分け方などもう少し実践の内容を書いてくれていると嬉しかったです。

8章は開発に役立つIDE、ノーコード/ローコード、CI/CDを提供するサービスについてそれぞれ解説してくれています。5章のリリースを読んだ際にモバイルのCI/CDってできるのだろうかと疑問に思っていたので、参考になりました。

## 感想

当初の目的に合ったものかどうかでいうと、少し異なりました。確かにコードを実装しながら学ぶものではありましたが、カウンタアプリを修正→解説→戻す、の繰り返しで私のイメージとは異なりました。私は、一連のサンプルアプリに必要な機能を追加しながら学ぶ[flutter-study.dev](https://www.flutter-study.dev/)の方が学びやすかったです。一方、[flutter-study.dev](https://www.flutter-study.dev/)はバージョンが古く、少し改修しないといけない（特にFirebase部分）ので、最近出版されたこの本はその壁にぶつからない点は良かったです。

また、業務でCrashlyticsを使ってみたいなと思った際とても役立ちました。おそらくこの本はこういうことをやりたいなと目的がある場合、その触りを学ぶのに適していると思います。初学者と中級者の間くらいの本かなと。

最後に、Flutterを勉強してみて、Webとモバイルは全く違うなというよくある感想を私も感じ取りました。だからこそ業務などで積極的に関わっていて、SREとして様々なアプリに対応できるようになりたいなと改めて思いました。今後もFlutterの勉強も続けていきます。

最後まで読んでいただきありがとうございました。