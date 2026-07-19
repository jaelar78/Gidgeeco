import { useCart } from '../context/CartContext'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalPrice } = useCart()

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-serif text-brand-dark flex items-center gap-2">
            <ShoppingBag size={22} />
            Your Cart
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-brand-gold hover:underline text-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-brand-dark truncate">
                      {item.name}
                    </h3>
                    <p className="text-brand-gold font-medium mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex items-center justify-between text-lg font-medium">
              <span className="text-brand-dark">Total</span>
              <span className="text-brand-gold">${totalPrice.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-brand-dark text-white text-center py-3 rounded font-medium hover:bg-black transition-colors"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="block w-full text-center text-sm text-gray-500 hover:text-brand-gold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
