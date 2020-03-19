// using custom fonts

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

class MyHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
     return Scaffold(
       appBar: AppBar(
        title: Text("Using Custom Fonts"),
        backgroundColor: Colors.yellow[600],
      ),
      body: Container(
        child: Center(
          // Add Text
          child: Text("The quick brown fox jumps over the lazy dog 2",
              // Center align text
              textAlign: TextAlign.center,
              // set a text style which defines a custom font
              style: getCustomFontTextStyle()),
        )
      ),
     );
  }
}


// TextStyleClass
TextStyle getCustomFontTextStyle() {
  return const TextStyle(
    // set color of text
    color: Colors.red,
    // set the font family as defined in pubspec.yaml
    fontFamily: 'Pacifico',
    // set the font weight
    fontWeight: FontWeight.w400,
    // set the font size
    fontSize: 36.0);
}