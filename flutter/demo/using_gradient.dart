// using_gradient

import 'package:flutter/material.dart';

import './utils.dart' as utils;

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MyHome()
    );
  }
}

class MyHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
     return Scaffold(
       appBar: AppBar(
        title: Text("Using Gradient"),
        backgroundColor: Colors.yellow[600],
      ),
      body: Container(
        child: Center(
          child: Text(
            "Hello World!",
            style: TextStyle(color: Colors.white),
          ),
        ),
        // set background
        decoration: BoxDecoration(
          gradient: utils.getCustomGradient()
        ),
      ),
     );
  }
}