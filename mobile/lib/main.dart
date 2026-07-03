import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

const faraiGreen = Color(0xFF126A4A);
const faraiDarkGreen = Color(0xFF0B4E36);
const faraiInk = Color(0xFF17211C);
const faraiMuted = Color(0xFF66726B);
const faraiCream = Color(0xFFF7FAF8);
const faraiGold = Color(0xFFD49A2A);
const faraiFire = Color(0xFFFF6A00);

const supabaseUrl = 'https://arporgvilgiacbrjlqvg.supabase.co';
const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFycG9yZ3ZpbGdpYWNicmpscXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NDA4MDYsImV4cCI6MjA5NjIxNjgwNn0.KHepMARGi3nh-qqW9FGAtvch2f31ERSTRs19jRicgiY';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Supabase.initialize(url: supabaseUrl, publishableKey: supabaseAnonKey);
  runApp(const FaraiConnectApp());
}

final supabase = Supabase.instance.client;

class FaraiConnectApp extends StatelessWidget {
  const FaraiConnectApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FaraiConnect',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: faraiCream,
        colorScheme: ColorScheme.fromSeed(
          seedColor: faraiGreen,
          primary: faraiGreen,
          surface: Colors.white,
        ),
      ),
      home: const AuthGate(),
    );
  }
}

class AuthGate extends StatelessWidget {
  const AuthGate({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<AuthState>(
      stream: supabase.auth.onAuthStateChange,
      builder: (context, snapshot) {
        final session = snapshot.data?.session ?? supabase.auth.currentSession;
        if (session == null) return const LoginScreen();
        return const HomeScreen();
      },
    );
  }
}

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isRegistering = false;
  bool _busy = false;
  String _message = '';

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    setState(() {
      _busy = true;
      _message = '';
    });

    try {
      if (_isRegistering) {
        await supabase.auth.signUp(
          email: _emailController.text.trim(),
          password: _passwordController.text,
        );
        setState(() => _message = 'Check your email to verify your account.');
      } else {
        await supabase.auth.signInWithPassword(
          email: _emailController.text.trim(),
          password: _passwordController.text,
        );
      }
    } on AuthException catch (error) {
      setState(() => _message = error.message);
    } catch (_) {
      setState(() => _message = 'Something went wrong. Please try again.');
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              const _LoginHero(),
              Transform.translate(
                offset: const Offset(0, -28),
                child: Container(
                  margin: const EdgeInsets.symmetric(horizontal: 18),
                  padding: const EdgeInsets.fromLTRB(22, 26, 22, 22),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(28),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.08),
                        blurRadius: 30,
                        offset: const Offset(0, 16),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Text(
                        _isRegistering ? 'Create account' : 'Welcome back',
                        style: TextStyle(
                          color: faraiInk,
                          fontSize: 28,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        _isRegistering
                            ? 'Start your FaraiConnect profile.'
                            : 'Sign in to your FaraiConnect account.',
                        style: const TextStyle(color: faraiMuted, fontSize: 15),
                      ),
                      const SizedBox(height: 22),
                      _AuthField(
                        controller: _emailController,
                        label: 'Email address',
                        icon: Icons.person_rounded,
                        keyboardType: TextInputType.emailAddress,
                      ),
                      const SizedBox(height: 14),
                      _AuthField(
                        controller: _passwordController,
                        label: 'Password',
                        icon: Icons.lock_rounded,
                        obscureText: true,
                      ),
                      const SizedBox(height: 18),
                      FilledButton(
                        onPressed: _busy ? null : _submit,
                        style: FilledButton.styleFrom(
                          minimumSize: const Size.fromHeight(56),
                          backgroundColor: faraiGreen,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                        ),
                        child: Text(
                          _busy
                              ? 'Please wait...'
                              : _isRegistering
                              ? 'Create account'
                              : 'Login',
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                      ),
                      if (_message.isNotEmpty) ...[
                        const SizedBox(height: 14),
                        Text(
                          _message,
                          style: const TextStyle(
                            color: Color(0xFFA12D2D),
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ],
                      const SizedBox(height: 18),
                      TextButton(
                        onPressed: () {
                          setState(() {
                            _isRegistering = !_isRegistering;
                            _message = '';
                          });
                        },
                        child: Text(
                          _isRegistering
                              ? 'Already have an account? Sign in'
                              : "Don't have an account? Create one free",
                          style: const TextStyle(
                            color: faraiGreen,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                      ),
                      TextButton(
                        onPressed: () => Navigator.of(context).pushReplacement(
                          MaterialPageRoute(builder: (_) => const HomeScreen()),
                        ),
                        child: const Text('Preview app without login'),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _LoginHero extends StatelessWidget {
  const _LoginHero();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(24, 28, 24, 76),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [faraiGreen, faraiDarkGreen],
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              _LogoMark(size: 64),
              SizedBox(width: 14),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'FaraiConnect',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 28,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  Text(
                    'Property and places network',
                    style: TextStyle(color: Colors.white70, fontSize: 16),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 52),
          RichText(
            text: const TextSpan(
              style: TextStyle(
                color: Colors.white,
                fontSize: 37,
                height: 1.12,
                fontWeight: FontWeight.w900,
              ),
              children: [
                TextSpan(text: 'Find trusted property.\n'),
                TextSpan(
                  text: 'Discover real places.',
                  style: TextStyle(color: Color(0xFFA9E87B)),
                ),
              ],
            ),
          ),
          const SizedBox(height: 18),
          const Text(
            'A Zimbabwe-focused network for verified listings, trusted agents, useful places, and memories tied to where people visit.',
            style: TextStyle(color: Colors.white, fontSize: 17, height: 1.45),
          ),
        ],
      ),
    );
  }
}

class _AuthField extends StatelessWidget {
  const _AuthField({
    required this.controller,
    required this.label,
    required this.icon,
    this.obscureText = false,
    this.keyboardType,
  });

  final TextEditingController controller;
  final String label;
  final IconData icon;
  final bool obscureText;
  final TextInputType? keyboardType;

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      obscureText: obscureText,
      keyboardType: keyboardType,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon),
        filled: true,
        fillColor: const Color(0xFFF6FAF7),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: faraiGreen.withValues(alpha: 0.16)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: faraiGreen.withValues(alpha: 0.16)),
        ),
      ),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _categoryIndex = 1;
  int _bottomIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const _HomeHeader(),
                  _HeroCard(category: categories[_categoryIndex].label),
                  _CategoryDock(
                    selectedIndex: _categoryIndex,
                    onSelected: (index) =>
                        setState(() => _categoryIndex = index),
                  ),
                  const _FeaturedSection(),
                  const _PulseSection(),
                  const _TripSection(),
                  const _PeopleSection(),
                  const _HeartbeatBar(),
                  const SizedBox(height: 16),
                  const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 16),
                    child: Text(
                      'Resort reels',
                      style: TextStyle(
                        color: faraiInk,
                        fontSize: 18,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                ],
              ),
            ),
            SliverList.builder(
              itemCount: resorts.length,
              itemBuilder: (context, index) =>
                  ResortReel(resort: resorts[index]),
            ),
            const SliverToBoxAdapter(child: SizedBox(height: 92)),
          ],
        ),
      ),
      bottomNavigationBar: _BottomNav(
        selectedIndex: _bottomIndex,
        onSelected: (index) => setState(() => _bottomIndex = index),
      ),
    );
  }
}

class _HomeHeader extends StatelessWidget {
  const _HomeHeader();

  @override
  Widget build(BuildContext context) {
    final user = supabase.auth.currentUser;
    final name =
        user?.userMetadata?['display_name'] as String? ??
        'Simbarashe Chaputsira';
    final username =
        user?.userMetadata?['username'] as String? ?? '@farai_moyo';

    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 10, 16, 10),
      child: Row(
        children: [
          const _LogoMark(size: 50),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: faraiInk,
                    fontSize: 16,
                    fontWeight: FontWeight.w900,
                  ),
                ),
                Text(
                  username,
                  style: const TextStyle(color: faraiMuted, fontSize: 13),
                ),
              ],
            ),
          ),
          const _HeaderIcon(icon: Icons.notifications_rounded, badge: '0'),
          _HeaderIcon(
            icon: Icons.menu_rounded,
            onTap: () => supabase.auth.signOut(),
          ),
        ],
      ),
    );
  }
}

class _HeroCard extends StatelessWidget {
  const _HeroCard({required this.category});

  final String category;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 255,
      width: double.infinity,
      decoration: const BoxDecoration(
        image: DecorationImage(
          image: NetworkImage(
            'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=90',
          ),
          fit: BoxFit.cover,
        ),
      ),
      child: DecoratedBox(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.centerLeft,
            end: Alignment.centerRight,
            colors: [
              Colors.white.withValues(alpha: 0.94),
              Colors.white.withValues(alpha: 0.55),
              Colors.white.withValues(alpha: 0.02),
            ],
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 14, 16, 18),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const _SearchBar(),
              const Spacer(),
              const Text(
                'Discover amazing',
                style: TextStyle(
                  color: faraiInk,
                  fontSize: 20,
                  fontWeight: FontWeight.w500,
                ),
              ),
              Text(
                category,
                style: const TextStyle(
                  color: faraiGreen,
                  fontSize: 42,
                  height: 0.9,
                  fontWeight: FontWeight.w900,
                ),
              ),
              const SizedBox(height: 10),
              const SizedBox(
                width: 260,
                child: Text(
                  'Find trusted property, places, activities, trips, and people around Zimbabwe.',
                  style: TextStyle(color: faraiInk, fontSize: 14, height: 1.35),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SearchBar extends StatelessWidget {
  const _SearchBar();

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 46,
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.94),
        borderRadius: BorderRadius.circular(14),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.06),
            blurRadius: 18,
          ),
        ],
      ),
      child: const Row(
        children: [
          SizedBox(width: 14),
          Icon(Icons.search_rounded, color: faraiMuted, size: 21),
          SizedBox(width: 10),
          Expanded(
            child: Text(
              'Search properties, places, schools, resorts...',
              overflow: TextOverflow.ellipsis,
              style: TextStyle(color: faraiMuted, fontWeight: FontWeight.w700),
            ),
          ),
          Icon(Icons.tune_rounded, color: faraiGreen, size: 21),
          SizedBox(width: 14),
        ],
      ),
    );
  }
}

class _CategoryDock extends StatelessWidget {
  const _CategoryDock({required this.selectedIndex, required this.onSelected});

  final int selectedIndex;
  final ValueChanged<int> onSelected;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 68,
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
      decoration: const BoxDecoration(color: Colors.white),
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: categories.length,
        separatorBuilder: (_, _) => const SizedBox(width: 6),
        itemBuilder: (context, index) {
          final category = categories[index];
          final active = index == selectedIndex;
          return InkWell(
            onTap: () => onSelected(index),
            borderRadius: BorderRadius.circular(14),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 180),
              padding: const EdgeInsets.symmetric(horizontal: 12),
              decoration: BoxDecoration(
                color: active ? faraiGreen : Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: faraiGreen.withValues(alpha: 0.12)),
              ),
              child: Row(
                children: [
                  Icon(
                    category.icon,
                    color: active ? Colors.white : faraiGreen,
                    size: 18,
                  ),
                  const SizedBox(width: 7),
                  Text(
                    category.label,
                    style: TextStyle(
                      color: active ? Colors.white : faraiInk,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

class _FeaturedSection extends StatelessWidget {
  const _FeaturedSection();

  @override
  Widget build(BuildContext context) {
    return _SectionBlock(
      icon: Icons.home_rounded,
      title: 'Featured properties',
      subtitle: 'Verified listings from trusted agents',
      child: SizedBox(
        height: 292,
        child: ListView.separated(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          scrollDirection: Axis.horizontal,
          itemCount: featured.length,
          separatorBuilder: (_, _) => const SizedBox(width: 12),
          itemBuilder: (context, index) => FeaturedCard(item: featured[index]),
        ),
      ),
    );
  }
}

class FeaturedCard extends StatelessWidget {
  const FeaturedCard({super.key, required this.item});

  final FeaturedItem item;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 210,
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.06),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Stack(
              fit: StackFit.expand,
              children: [
                Image.network(item.image, fit: BoxFit.cover),
                Positioned(
                  top: 10,
                  left: 10,
                  child: _StatusPill(
                    label: item.badge,
                    color: item.badge.contains('Resort')
                        ? const Color(0xFF1675D1)
                        : faraiGreen,
                  ),
                ),
                const Positioned(
                  top: 10,
                  right: 10,
                  child: Icon(
                    Icons.favorite_border_rounded,
                    color: Colors.white,
                  ),
                ),
                Positioned(
                  left: 10,
                  bottom: 10,
                  child: _DarkPill(
                    icon: Icons.calendar_month_rounded,
                    label: '${item.plans}',
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  item.title,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontWeight: FontWeight.w900,
                    fontSize: 15,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  item.place,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: faraiMuted,
                    fontWeight: FontWeight.w700,
                    fontSize: 12,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  item.price,
                  style: const TextStyle(
                    color: faraiGreen,
                    fontWeight: FontWeight.w900,
                    fontSize: 15,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class ResortReel extends StatefulWidget {
  const ResortReel({super.key, required this.resort});

  final Resort resort;

  @override
  State<ResortReel> createState() => _ResortReelState();
}

class _ResortReelState extends State<ResortReel> {
  final _controller = PageController();
  int _activePhoto = 0;
  bool _liked = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _precacheResortImages();
  }

  @override
  void didUpdateWidget(covariant ResortReel oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.resort != widget.resort) {
      _precacheResortImages();
    }
  }

  void _precacheResortImages() {
    for (final image in widget.resort.images.take(3)) {
      precacheImage(NetworkImage(image), context);
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final view = MediaQuery.sizeOf(context);
    final reelHeight = (view.height - 88).clamp(640.0, 820.0);
    final imageCacheWidth =
        (view.width * MediaQuery.devicePixelRatioOf(context)).round();

    return SizedBox(
      height: reelHeight,
      width: double.infinity,
      child: Stack(
        children: [
          PageView.builder(
            controller: _controller,
            itemCount: widget.resort.images.length,
            onPageChanged: (index) => setState(() => _activePhoto = index),
            itemBuilder: (context, index) {
              return Image.network(
                widget.resort.images[index],
                fit: BoxFit.cover,
                cacheWidth: imageCacheWidth,
                gaplessPlayback: true,
                filterQuality: FilterQuality.medium,
                frameBuilder: (context, child, frame, wasSynchronouslyLoaded) {
                  if (wasSynchronouslyLoaded || frame != null) return child;
                  return Container(color: faraiInk);
                },
              );
            },
          ),
          DecoratedBox(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Colors.black.withValues(alpha: 0.10),
                  Colors.black.withValues(alpha: 0.20),
                  Colors.black.withValues(alpha: 0.86),
                ],
              ),
            ),
            child: const SizedBox.expand(),
          ),
          Positioned(
            top: 18,
            right: 12,
            child: Column(
              children: [
                _ReelAction(
                  icon: _liked
                      ? Icons.favorite_rounded
                      : Icons.favorite_border_rounded,
                  value: '${widget.resort.likes + (_liked ? 1 : 0)}',
                  label: 'Save',
                  active: _liked,
                  onTap: () => setState(() => _liked = !_liked),
                ),
                _ReelAction(
                  icon: Icons.group_rounded,
                  value: '${widget.resort.going}',
                  label: 'Going',
                ),
                _ReelAction(
                  icon: Icons.event_available_rounded,
                  value: '${widget.resort.plans}',
                  label: 'Plan',
                ),
                _ReelAction(
                  icon: Icons.alt_route_rounded,
                  value: '${widget.resort.activities.length}',
                  label: 'Activities',
                ),
                _ReelAction(
                  icon: Icons.chat_bubble_rounded,
                  value: '${widget.resort.reviews}',
                  label: 'Reviews',
                ),
                const _ReelAction(
                  icon: Icons.phone_rounded,
                  value: '',
                  label: '',
                  whatsapp: true,
                ),
              ],
            ),
          ),
          Positioned(
            left: 16,
            right: 72,
            bottom: 142,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _StatusPill(
                  label: widget.resort.type.toUpperCase(),
                  color: faraiGreen,
                ),
                const SizedBox(height: 10),
                Text(
                  widget.resort.title,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 28,
                    height: 1.05,
                    fontWeight: FontWeight.w900,
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    const Icon(Icons.star_rounded, color: faraiGold, size: 18),
                    Text(
                      '${widget.resort.rating.toStringAsFixed(1)} (${widget.resort.reviews} reviews)',
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  widget.resort.price,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w900,
                  ),
                ),
                const SizedBox(height: 12),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: widget.resort.tags
                      .map((tag) => _DarkChip(label: tag))
                      .toList(),
                ),
              ],
            ),
          ),
          Positioned(
            left: 12,
            right: 12,
            bottom: 72,
            child: SizedBox(
              height: 48,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: widget.resort.images.length,
                separatorBuilder: (_, _) => const SizedBox(width: 6),
                itemBuilder: (context, index) {
                  final active = _activePhoto == index;
                  return GestureDetector(
                    onTap: () => _controller.animateToPage(
                      index,
                      duration: const Duration(milliseconds: 260),
                      curve: Curves.easeOut,
                    ),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 180),
                      width: 64,
                      padding: const EdgeInsets.all(1.5),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(
                          color: active ? faraiGold : Colors.white54,
                          width: active ? 2 : 1,
                        ),
                      ),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(6),
                        child: Image.network(
                          widget.resort.images[index],
                          fit: BoxFit.cover,
                          cacheWidth: 180,
                          gaplessPlayback: true,
                          filterQuality: FilterQuality.medium,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ReelAction extends StatelessWidget {
  const _ReelAction({
    required this.icon,
    required this.value,
    required this.label,
    this.active = false,
    this.whatsapp = false,
    this.onTap,
  });

  final IconData icon;
  final String value;
  final String label;
  final bool active;
  final bool whatsapp;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(999),
        child: Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: whatsapp
                ? const Color(0xFF25D366)
                : active
                ? faraiGold
                : Colors.black.withValues(alpha: 0.52),
            border: Border.all(color: Colors.white.withValues(alpha: 0.22)),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                icon,
                color: whatsapp || active ? faraiInk : Colors.white,
                size: 16,
              ),
              if (value.isNotEmpty)
                Text(
                  value,
                  style: TextStyle(
                    color: active ? faraiInk : Colors.white,
                    fontSize: 10,
                    fontWeight: FontWeight.w900,
                  ),
                ),
              if (label.isNotEmpty)
                Text(
                  label,
                  style: TextStyle(
                    color: active ? faraiInk : Colors.white,
                    fontSize: 8,
                    fontWeight: FontWeight.w900,
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

class _PulseSection extends StatelessWidget {
  const _PulseSection();

  @override
  Widget build(BuildContext context) {
    return _SectionBlock(
      icon: Icons.local_fire_department_rounded,
      title: "What's happening near you",
      iconColor: faraiFire,
      titleColor: faraiFire,
      child: SizedBox(
        height: 132,
        child: ListView.separated(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          scrollDirection: Axis.horizontal,
          itemCount: pulseItems.length,
          separatorBuilder: (_, _) => const SizedBox(width: 12),
          itemBuilder: (context, index) => _PulseCard(item: pulseItems[index]),
        ),
      ),
    );
  }
}

class _PulseCard extends StatelessWidget {
  const _PulseCard({required this.item});

  final PulseItem item;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 190,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: item.color,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(item.icon, color: faraiGreen, size: 22),
              const Spacer(),
              const _TinyFaces(),
              const SizedBox(width: 4),
              Text(
                item.extra,
                style: const TextStyle(fontWeight: FontWeight.w900),
              ),
            ],
          ),
          const Spacer(),
          Text(
            item.count,
            style: const TextStyle(
              color: faraiGreen,
              fontWeight: FontWeight.w900,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            item.text,
            maxLines: 3,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              color: faraiInk,
              fontWeight: FontWeight.w800,
              height: 1.25,
            ),
          ),
        ],
      ),
    );
  }
}

class _TripSection extends StatelessWidget {
  const _TripSection();

  @override
  Widget build(BuildContext context) {
    return _SectionBlock(
      icon: Icons.calendar_month_rounded,
      title: 'Upcoming outings & trips',
      child: SizedBox(
        height: 132,
        child: ListView.separated(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          scrollDirection: Axis.horizontal,
          itemCount: trips.length,
          separatorBuilder: (_, _) => const SizedBox(width: 12),
          itemBuilder: (context, index) => _TripPreview(item: trips[index]),
        ),
      ),
    );
  }
}

class _TripPreview extends StatelessWidget {
  const _TripPreview({required this.item});

  final TripItem item;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 218,
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.black.withValues(alpha: 0.06)),
      ),
      child: Row(
        children: [
          SizedBox(
            width: 96,
            child: Image.network(
              item.image,
              fit: BoxFit.cover,
              height: double.infinity,
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(9, 8, 8, 8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    item.title,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontWeight: FontWeight.w900,
                      fontSize: 11.5,
                      height: 1.08,
                    ),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    item.date,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: faraiMuted,
                      fontSize: 9.5,
                      height: 1.1,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const Spacer(),
                  SizedBox(
                    height: 28,
                    width: double.infinity,
                    child: FilledButton(
                      onPressed: () {},
                      style: FilledButton.styleFrom(
                        backgroundColor: faraiGreen,
                        padding: EdgeInsets.zero,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      child: const Text(
                        'Join',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _PeopleSection extends StatelessWidget {
  const _PeopleSection();

  @override
  Widget build(BuildContext context) {
    return _SectionBlock(
      icon: Icons.trending_up_rounded,
      title: 'People trending in your network',
      child: SizedBox(
        height: 106,
        child: ListView.separated(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          scrollDirection: Axis.horizontal,
          itemCount: people.length,
          separatorBuilder: (_, _) => const SizedBox(width: 12),
          itemBuilder: (context, index) => _PersonCard(person: people[index]),
        ),
      ),
    );
  }
}

class _PersonCard extends StatelessWidget {
  const _PersonCard({required this.person});

  final Person person;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 190,
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.black.withValues(alpha: 0.06)),
      ),
      child: Row(
        children: [
          Stack(
            children: [
              CircleAvatar(
                radius: 27,
                backgroundImage: NetworkImage(person.photo),
              ),
              Positioned(
                right: 0,
                bottom: 0,
                child: CircleAvatar(
                  radius: 6,
                  backgroundColor: person.online ? Colors.green : Colors.orange,
                ),
              ),
            ],
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  person.name,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(fontWeight: FontWeight.w900),
                ),
                Text(
                  person.role,
                  style: const TextStyle(color: faraiMuted, fontSize: 12),
                ),
                const SizedBox(height: 4),
                const Text(
                  'Follow',
                  style: TextStyle(
                    color: faraiGreen,
                    fontWeight: FontWeight.w900,
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _HeartbeatBar extends StatelessWidget {
  const _HeartbeatBar();

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 14, 16, 6),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: faraiGreen.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(14),
      ),
      child: const Row(
        children: [
          Icon(Icons.groups_rounded, color: faraiGreen),
          SizedBox(width: 8),
          Expanded(
            child: Text(
              'Community heartbeat',
              style: TextStyle(fontWeight: FontWeight.w900),
            ),
          ),
          Text('1,245 online', style: TextStyle(fontWeight: FontWeight.w900)),
        ],
      ),
    );
  }
}

class _BottomNav extends StatelessWidget {
  const _BottomNav({required this.selectedIndex, required this.onSelected});

  final int selectedIndex;
  final ValueChanged<int> onSelected;

  @override
  Widget build(BuildContext context) {
    const items = [
      Icons.home_rounded,
      Icons.people_rounded,
      Icons.person_add_alt_1_rounded,
      Icons.favorite_rounded,
      Icons.dashboard_rounded,
    ];

    return Container(
      padding: const EdgeInsets.fromLTRB(14, 8, 14, 16),
      decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.92)),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: List.generate(items.length, (index) {
          final active = selectedIndex == index;
          return InkWell(
            onTap: () => onSelected(index),
            borderRadius: BorderRadius.circular(999),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 180),
              width: 56,
              height: 56,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: active ? faraiGreen : const Color(0xFFF8F8F2),
              ),
              child: Icon(
                items[index],
                color: active ? Colors.white : faraiMuted,
              ),
            ),
          );
        }),
      ),
    );
  }
}

class _SectionBlock extends StatelessWidget {
  const _SectionBlock({
    required this.icon,
    required this.title,
    required this.child,
    this.subtitle,
    this.iconColor,
    this.titleColor,
  });

  final IconData icon;
  final String title;
  final String? subtitle;
  final Widget child;
  final Color? iconColor;
  final Color? titleColor;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 18),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                Icon(icon, color: iconColor ?? faraiGreen, size: 22),
                const SizedBox(width: 8),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: TextStyle(
                          color: titleColor ?? faraiInk,
                          fontSize: 16,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                      if (subtitle != null)
                        Text(
                          subtitle!,
                          style: const TextStyle(
                            color: faraiMuted,
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          child,
        ],
      ),
    );
  }
}

class _LogoMark extends StatelessWidget {
  const _LogoMark({required this.size});

  final double size;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: const BoxDecoration(
        shape: BoxShape.circle,
        color: Colors.white,
      ),
      child: CustomPaint(painter: _LogoPainter()),
    );
  }
}

class _LogoPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final stroke = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = size.width * 0.12
      ..strokeCap = StrokeCap.round;
    final rect = Offset.zero & size;
    stroke.color = faraiGreen;
    canvas.drawArc(rect.deflate(size.width * 0.12), 0.5, 4.65, false, stroke);
    stroke.color = faraiGold;
    canvas.drawArc(rect.deflate(size.width * 0.12), -1.35, 1.05, false, stroke);

    final text = TextPainter(
      text: TextSpan(
        text: 'F',
        style: TextStyle(
          color: faraiGreen,
          fontSize: size.width * 0.42,
          fontWeight: FontWeight.w900,
        ),
      ),
      textDirection: TextDirection.ltr,
    )..layout();
    text.paint(
      canvas,
      Offset((size.width - text.width) / 2, (size.height - text.height) / 2),
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _HeaderIcon extends StatelessWidget {
  const _HeaderIcon({required this.icon, this.badge, this.onTap});

  final IconData icon;
  final String? badge;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: onTap,
      icon: Stack(
        clipBehavior: Clip.none,
        children: [
          Icon(icon, color: faraiInk),
          if (badge != null)
            Positioned(
              right: -5,
              top: -5,
              child: CircleAvatar(
                radius: 8,
                backgroundColor: faraiGreen,
                child: Text(
                  badge!,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 9,
                    fontWeight: FontWeight.w900,
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _StatusPill extends StatelessWidget {
  const _StatusPill({required this.label, required this.color});

  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        label,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 12,
          fontWeight: FontWeight.w900,
        ),
      ),
    );
  }
}

class _DarkPill extends StatelessWidget {
  const _DarkPill({required this.icon, required this.label});

  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
      decoration: BoxDecoration(
        color: Colors.black.withValues(alpha: 0.55),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Row(
        children: [
          Icon(icon, color: Colors.white, size: 14),
          const SizedBox(width: 4),
          Text(
            label,
            style: const TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.w900,
              fontSize: 11,
            ),
          ),
        ],
      ),
    );
  }
}

class _DarkChip extends StatelessWidget {
  const _DarkChip({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.black.withValues(alpha: 0.54),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        label,
        style: const TextStyle(
          color: Colors.white,
          fontWeight: FontWeight.w900,
        ),
      ),
    );
  }
}

class _TinyFaces extends StatelessWidget {
  const _TinyFaces();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 48,
      height: 22,
      child: Stack(
        children: List.generate(3, (index) {
          return Positioned(
            left: index * 13,
            child: CircleAvatar(
              radius: 11,
              backgroundImage: NetworkImage(people[index].photo),
            ),
          );
        }),
      ),
    );
  }
}

class CategoryItem {
  const CategoryItem(this.label, this.icon);
  final String label;
  final IconData icon;
}

class FeaturedItem {
  const FeaturedItem({
    required this.title,
    required this.place,
    required this.price,
    required this.badge,
    required this.plans,
    required this.image,
  });

  final String title;
  final String place;
  final String price;
  final String badge;
  final int plans;
  final String image;
}

class Resort {
  const Resort({
    required this.title,
    required this.type,
    required this.price,
    required this.rating,
    required this.reviews,
    required this.likes,
    required this.going,
    required this.plans,
    required this.activities,
    required this.tags,
    required this.images,
  });

  final String title;
  final String type;
  final String price;
  final double rating;
  final int reviews;
  final int likes;
  final int going;
  final int plans;
  final List<String> activities;
  final List<String> tags;
  final List<String> images;
}

class PulseItem {
  const PulseItem(this.icon, this.count, this.extra, this.text, this.color);
  final IconData icon;
  final String count;
  final String extra;
  final String text;
  final Color color;
}

class TripItem {
  const TripItem(this.title, this.date, this.image);
  final String title;
  final String date;
  final String image;
}

class Person {
  const Person(this.name, this.role, this.photo, this.online);
  final String name;
  final String role;
  final String photo;
  final bool online;
}

const categories = [
  CategoryItem('Properties', Icons.home_rounded),
  CategoryItem('Resorts', Icons.beach_access_rounded),
  CategoryItem('Stands', Icons.crop_square_rounded),
  CategoryItem('Farms', Icons.grass_rounded),
  CategoryItem('Churches', Icons.church_rounded),
  CategoryItem('Schools', Icons.school_rounded),
  CategoryItem('Malls', Icons.shopping_bag_rounded),
  CategoryItem('Agents', Icons.person_pin_rounded),
];

const people = [
  Person(
    'Tawanda',
    'Property Agent',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    true,
  ),
  Person(
    'Rudo',
    'Explorer',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    true,
  ),
  Person(
    'Tinashe',
    'Resort Host',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    false,
  ),
  Person(
    'Mai Chipo',
    'Travel Planner',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80',
    true,
  ),
];

const featured = [
  FeaturedItem(
    title: 'Modern 4 Bed House',
    place: 'Borrowdale, Harare',
    price: 'US\$ 250,000',
    badge: 'Verified Property',
    plans: 12,
    image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=90',
  ),
  FeaturedItem(
    title: 'Nyanga Eco Resort',
    place: 'Nyanga, Manicaland',
    price: 'From US\$ 120 / night',
    badge: 'Verified Resort',
    plans: 16,
    image:
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=90',
  ),
  FeaturedItem(
    title: 'Residential Stand',
    place: 'Ruwa, Mashonaland',
    price: 'US\$ 15,000',
    badge: 'Verified',
    plans: 7,
    image:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=90',
  ),
];

const pulseItems = [
  PulseItem(
    Icons.groups_rounded,
    '8 people',
    '+5',
    'are planning to visit Chimanimani this weekend',
    Color(0xFFEAF8F0),
  ),
  PulseItem(
    Icons.home_rounded,
    '12 people',
    '+12',
    'saved a property in Borrowdale',
    Color(0xFFF1F5FF),
  ),
  PulseItem(
    Icons.star_rounded,
    '5 new reviews',
    '+5',
    'added to Kuimba Shiri Resort',
    Color(0xFFFFF6E8),
  ),
  PulseItem(
    Icons.diversity_3_rounded,
    'Mushikashika',
    '+3',
    'outing group has a new trip this Sunday',
    Color(0xFFFFEEF4),
  ),
];

const trips = [
  TripItem(
    'Nyanga Day Trip',
    'Sun, 25 May 2025',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=500&q=80',
  ),
  TripItem(
    'Chimanimani Hike',
    'Sat, 31 May 2025',
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=500&q=80',
  ),
  TripItem(
    'Families Fun Day',
    'Sat, 24 May 2025',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=500&q=80',
  ),
  TripItem(
    'Sunset Boat Cruise',
    'Sat, 7 Jun 2025',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80',
  ),
];

const resorts = [
  Resort(
    title: 'Great Zimbabwe heritage resort',
    type: 'Heritage resort',
    price: '\$45/day',
    rating: 5.0,
    reviews: 64,
    likes: 521,
    going: 3,
    plans: 8,
    activities: [
      'Guided ruins tour',
      'Heritage walks',
      'Picnic spaces',
      'Cultural photography',
    ],
    tags: ['Day trip', 'Stay'],
    images: [
      'https://images.unsplash.com/photo-1604014238170-4def1e4e6fcf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
    ],
  ),
  Resort(
    title: 'Kariba lakeside family resort',
    type: 'Lake resort',
    price: '\$130/night',
    rating: 4.6,
    reviews: 42,
    likes: 448,
    going: 3,
    plans: 11,
    activities: ['Boat cruise', 'Fishing', 'Pool day', 'Sunset braai'],
    tags: ['Weekend getaway', 'Private', 'Family friendly'],
    images: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
    ],
  ),
];
