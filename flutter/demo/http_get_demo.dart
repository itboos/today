// using http get demo
import 'dart:convert';
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HttpGetData()
    );
  }
}

class HttpGetData extends StatefulWidget {
  @override
  HttpGetDataState createState() => HttpGetDataState();
}

class HttpGetDataState extends State<HttpGetData> {
  final String url = "https://swapi.co/api/people";
  List data;

  // Function to get the JSON data
  Future<String> getJSONData() async {
    var response = await http.get(
        // Encode the url
        Uri.encodeFull(url),
        // Only accept JSON response
        headers: {"Accept": "application/json"});

    // Logs the response body to the console
    print(response.body);

    // To modify the state of the app, use this method
    setState(() {
      // Get the JSON data
      var dataConvertedToJSON = json.decode(response.body);
      // 取出需要的数据
      data = dataConvertedToJSON['results'];
    });

    return "Successfull";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Retrieve JSON Data via HTTP GET"),
      ),
      body: ListView.builder(
        itemCount: data == null ? 0 : data.length,
        itemBuilder: (BuildContext context, int index) {
          return Container(
            child: Center(
              child: Column(
                // Stretch the cards in horizontal axis
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                    Card(
                      child: Container(
                        child: Text(
                          // Read the name field value and set it in the Text widget
                          data[index]['name'],
                          // set some style to text
                          style: TextStyle(
                              fontSize: 20.0, color: Colors.lightBlueAccent),
                        ),
                        // added padding
                        padding: const EdgeInsets.all(15.0),
                      ),
                    )
                  ],
              ),
            ),
          );
      },),
    );
  }

  @override
  void initState(){
    super.initState();

    // Call the getJSONData() method when the app initializes
    this.getJSONData();
  }
}
