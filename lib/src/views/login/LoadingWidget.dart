import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class LoadingWidget extends StatelessWidget {
  const LoadingWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('lib/src/assets/images/background_main.png'), // Replace with your image path
                fit: BoxFit.cover,
              ),
            ),
          ),
          const Positioned(
            left: 0,
            right: 0,
            bottom: 20, // Adjust the bottom value as needed
            child: Center(
              child: SpinKitSpinningLines(
                color: Colors.blue, // Set the color of the spinner
                size: 50.0, // Set the size of the spinner
              ),
            ),
          ),
        ],
      ),
    );
  }
}
