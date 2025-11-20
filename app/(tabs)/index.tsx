import { ProductCard } from '@/components/product-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Product } from '@/types/product';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';

const API_URL = 'https://fakestoreapi.com/products';

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  
  const textSecondary = useThemeColor({ light: '#666666', dark: '#b8b8b8' }, 'text');
  const errorColor = useThemeColor({ light: '#d32f2f', dark: '#ff6b6b' }, 'text');
  const accentColor = useThemeColor({ light: '#0a7ea4', dark: '#d4af37' }, 'tint');

  const fetchProducts = async () => {
    try {
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  if (loading && !refreshing) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={accentColor} />
        <ThemedText style={[styles.loadingText, { color: textSecondary }]}>
          Carregando produtos...
        </ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText type="subtitle" style={[styles.errorText, { color: errorColor }]}>
          Erro ao carregar produtos
        </ThemedText>
        <ThemedText style={[styles.errorMessage, { color: textSecondary }]}>
          {error}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>Produtos</ThemedText>
        <ThemedText style={[styles.subtitle, { color: textSecondary }]}>
          {products.length} produtos encontrados
        </ThemedText>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={accentColor}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 50,
    paddingBottom: 16,
  },
  title: {
    letterSpacing: -0.4,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 8,
    fontWeight: '400',
    letterSpacing: 0.4,
  },
  listContent: {
    paddingBottom: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 24,
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  errorText: {
    marginBottom: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  errorMessage: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.2,
  },
});
