// using alert dialog

import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MyHome()
    );
  }
}

class MyHome extends StatefulWidget {
  @override
  MyHomeState createState() => MyHomeState();
}

class MyHomeState extends State<MyHome> {
  AlertDialog dialog = AlertDialog(
    content: Text(
      'Hello Flutter',
      style: TextStyle(fontSize: 30.0, color: Colors.blue)
    )
  );
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Using Alert Dialog 2"),
        ),
        body: Container(
          child: Center(
            child: RaisedButton(
              child: Text("Hit to alert"),
              onPressed: () {
                showDialog(context: context, builder: (BuildContext context) => dialog);
              },
            ),
          ),
        ),
    );
  }
}
