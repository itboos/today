// 加载本地 json 文件， listView 可以滚动。
import 'dart:convert';

import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: JsonList()
    );
  }
}

class JsonList extends StatefulWidget {
  @override
  JsonListState createState() => JsonListState();
}

class JsonListState extends State<JsonList> {
  List data;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Load local JSON file"),
      ),
      body: Container(
        child: Center(
          // Use future builder and DefaultAssetBundle to load the local JSON file
          child: FutureBuilder(
            future: DefaultAssetBundle
                    .of(context)
                    .loadString('assets/data/starwars_data.json'),
            builder: (context, snapshot){
              // Decode the JSON
              var new_data = json.decode(snapshot.data.toString());

              return ListView.builder(
                itemBuilder: (BuildContext context, int index){
                  return Card(
                    child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: <Widget>[
                            Padding(padding: EdgeInsets.only(top: 10.0),),
                            Padding(
                              padding: EdgeInsets.only(left: 10.0), 
                              child: Text("Name: " + new_data[index]['name'], style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.w400, color: Colors.blue)),),
                            Padding(
                              padding: EdgeInsets.only(left: 10.0), 
                              child: Text("Height: " + new_data[index]['height'])),
                            Padding(
                              padding: EdgeInsets.only(left: 10.0), 
                              child: Text("Mass: " + new_data[index]['mass']),),
                            Padding(
                              padding: EdgeInsets.only(left: 10.0), 
                              child: Text("Hair Color: " + new_data[index]['hair_color'])),
                            Padding(
                              padding: EdgeInsets.only(left: 10.0), 
                              child: Text("Skin Color: " + new_data[index]['skin_color']),),
                     
                            Padding(padding: EdgeInsets.only(bottom: 10.0),),
                          ],
                        ),
                    margin: EdgeInsets.fromLTRB(10.0, 10.0, 10.0, 10.0),
                  );
                },
                itemCount: new_data == null ? 0 : new_data.length,
              );
              
            },
          ),
        ),
      ),
    );
  }
}