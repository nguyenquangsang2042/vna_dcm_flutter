import 'package:flutter/material.dart';
import 'package:awesome_bottom_bar/awesome_bottom_bar.dart';
import 'package:awesome_bottom_bar/tab_item.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vna_dcm_flutter/src/assets/styles/app_color.dart';
import 'package:vna_dcm_flutter/src/utils/Constant.dart';
import 'package:vna_dcm_flutter/src/viewmodels/site/site_bloc.dart';
import 'package:vna_dcm_flutter/src/views/home/home_screen.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int visit = 0;

  final List<TabItem> items = [
    TabItem(
      icon: Icons.home,
      title: 'Home',
    ),
    TabItem(
      icon: Icons.search_sharp,
      title: 'Shop',
    ),
    TabItem(
      icon: Icons.favorite_border,
      title: 'Wishlist',
    ),
    TabItem(
      icon: Icons.shopping_cart_outlined,
      title: 'Cart',
    ),
    TabItem(
      icon: Icons.account_box,
      title: 'Profile',
    ),
  ];

  List<Widget> pages = [];

  @override
  void initState() {
    super.initState();
    pages = [
      HomeScreen(),
      ShopScreen(),
      WishlistScreen(),
      CartScreen(),
      ProfileScreen(),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<SiteBloc, SiteState>(
      builder: (context, state) {
        return Scaffold(
          body: pages[visit],
          bottomNavigationBar: BottomBarDefault(
            items: items,
            backgroundColor: AppColor.clPrimary,
            color: Colors.white,
            colorSelected: Colors.orange,
            indexSelected: visit,
            onTap: (int index) => setState(() {
              visit = index;
            }),
          ),
        );
      },
    );
  }
}

class ShopScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text('Shop Screen'),
    );
  }
}

class WishlistScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text('Wishlist Screen'),
    );
  }
}

class CartScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text('Cart Screen'),
    );
  }
}

class ProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text('Profile Screen'),
    );
  }
}
