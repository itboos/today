// 文本输入框
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      // Define the theme, set the primary swatch
      theme: ThemeData(primarySwatch: Colors.green),
      home: MyEditText(),
    );
  }
}

class MyEditText extends StatefulWidget {
  @override
  MyEditTextState createState() => MyEditTextState();
}

class MyEditTextState extends State<MyEditText> {
  String results = "";

  final TextEditingController controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
       appBar: AppBar(
        title: Text("Using EditText"),
        backgroundColor: Colors.yellow[600],
      ),
      body: Container(
         padding: const EdgeInsets.all(10.0),
         child: Center(
           child: Column(
             crossAxisAlignment: CrossAxisAlignment.stretch,
             children: <Widget>[
                TextField(
                  decoration: InputDecoration(hintText: "Enter text here..."),
                  onSubmitted: (String str) {
                    setState(() {
                      results = results + "\n" + str;
                      controller.text = "";
                    });
                  },
                  controller: controller,
                ),
              Text(results, style: TextStyle(color: Colors.green, fontSize: 16.0) )
             ],
           ),
         ),
      ),
    );
  }
}

