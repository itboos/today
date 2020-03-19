// using_gradient

import 'package:flutter/material.dart';
import 'package:flutterapp/gridview.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final MyGridView myGridView = MyGridView();

    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          // Here we take the value from the MyHomePage object that was created by
          // the App.build method, and use it to set our appbar title.
          title: Text("GridView Example"),
        ),
        body: myGridView.build(),
      ),
    );
  }
}