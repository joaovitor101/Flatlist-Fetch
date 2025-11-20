import { useThemeColor } from '@/hooks/use-theme-color';
import { Product } from '@/types/product';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './themed-text';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const cardBg = useThemeColor({ light: '#ffffff', dark: '#2a2a2a' }, 'background');
  const borderColor = useThemeColor({ light: '#e8e8e8', dark: '#3a3a3a' }, 'background');
  const categoryBg = useThemeColor({ light: '#f5f5f5', dark: '#353535' }, 'background');
  const imageBg = useThemeColor({ light: '#fafafa', dark: '#1f1f1f' }, 'background');
  const textSecondary = useThemeColor({ light: '#666666', dark: '#b8b8b8' }, 'text');
  const accentColor = useThemeColor({ light: '#0a7ea4', dark: '#d4af37' }, 'tint');
  const footerBorder = useThemeColor({ light: 'rgba(0, 0, 0, 0.06)', dark: 'rgba(255, 255, 255, 0.06)' }, 'background');

  return (
    <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
      <View style={[styles.imageContainer, { backgroundColor: imageBg }]}>
        <Image source={{ uri: product.image }} style={styles.image} contentFit="contain" />
      </View>
      <View style={styles.content}>
        <ThemedText type="subtitle" style={styles.title} numberOfLines={2}>
          {product.title}
        </ThemedText>
        <View style={[styles.categoryContainer, { backgroundColor: categoryBg }]}>
          <ThemedText style={[styles.category, { color: textSecondary }]}>
            {product.category}
          </ThemedText>
        </View>
        <ThemedText style={[styles.description, { color: textSecondary }]} numberOfLines={2}>
          {product.description}
        </ThemedText>
        <View style={[styles.footer, { borderTopColor: footerBorder }]}>
          <View style={styles.ratingContainer}>
            <ThemedText style={[styles.rating, { color: textSecondary }]}>
              ⭐ {product.rating.rate.toFixed(1)} ({product.rating.count})
            </ThemedText>
          </View>
          <ThemedText type="defaultSemiBold" style={[styles.price, { color: accentColor }]}>
            ${product.price.toFixed(2)}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 22,
    gap: 12,
  },
  title: {
    marginBottom: 8,
    fontSize: 19,
    fontWeight: '600',
    letterSpacing: -0.2,
    lineHeight: 26,
  },
  categoryContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    marginBottom: 8,
  },
  category: {
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: '500',
    letterSpacing: 1.2,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 14,
    letterSpacing: 0.1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  ratingContainer: {
    flex: 1,
  },
  rating: {
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
});

