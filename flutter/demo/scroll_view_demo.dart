//  可滚动列表
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: '有状态的组件',
      // Define the theme, set the primary swatch
      theme: ThemeData(primarySwatch: Colors.green),
      home: MyHome(),
    );
  }
}

class MyHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Declare some constants
    final double myTextSize = 30.0;
    final double myIconSize = 40.0;
    final TextStyle myTextStyle =
        TextStyle(color: Colors.grey, fontSize: myTextSize);
    
    var column = Column(
      // Makes the cards stretch in horizontal axis
      crossAxisAlignment: CrossAxisAlignment.stretch,
       children: <Widget>[
         // Setup the card
         MyCard(
           title: Text(
             "Favorite",
             style: myTextStyle
           ),
           icon:
             Icon(Icons.favorite, size: myIconSize, color: Colors.red)),
        MyCard(
           title: Text(
             "Alarm",
             style: myTextStyle
           ),
           icon:
             Icon(Icons.alarm, color: Colors.yellow, size: myIconSize,)),
        MyCard(
            title: Text(
              "Airport Shuttle",
              style: myTextStyle,
            ),
            icon: Icon(Icons.airport_shuttle,
                size: myIconSize, color: Colors.amber)),
        MyCard(
            title: Text(
              "Done",
              style: myTextStyle,
            ),
            icon: Icon(Icons.done, size: myIconSize, color: Colors.green)),
                 MyCard(
           title: Text(
             "Favorite2",
             style: myTextStyle
           ),
           icon:
             Icon(Icons.favorite, size: myIconSize, color: Colors.red)),
        MyCard(
           title: Text(
             "Alarm2",
             style: myTextStyle
           ),
           icon:
             Icon(Icons.alarm, size: myIconSize, color: Colors.blue)),
        MyCard(
            title: Text(
              "Airport Shuttle2",
              style: myTextStyle,
            ),
            icon: Icon(Icons.airport_shuttle,
                size: myIconSize, color: Colors.amber)),
        MyCard(
            title: Text(
              "Done2",
              style: myTextStyle,
            ),
            icon: Icon(Icons.done, size: myIconSize, color: Colors.green)),
        
        
       ],
    );

    return Scaffold(
      appBar: AppBar(
        title: Text("Stateless Widget"),
      ),
      body: Container(
        // Sets the padding in the main container
        padding: const EdgeInsets.only(bottom: 2.0),
        child:  Center(
          child: SingleChildScrollView(child: column),
        ),
      ),
    );
  }
}

// Create reuseable stateless widget
class MyCard extends StatelessWidget {
  final Widget icon;
  final Widget title;
  
  // Constructor. {} here denote that they are optional values i.e you can use as: MyCard()
  MyCard({this.title, this.icon});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(bottom: 1.0),
      child: Card(
        child: Container(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            children: <Widget>[this.title, this.icon],
          ),
        ),
      ),
    );
  }

}