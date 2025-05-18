export default function HeaderTop() {
  return (
    <div className="bg-gray-100 py-2">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="tel:+966500000000" className="text-sm text-gray-600 hover:text-gray-800">
              <span className="ml-2">+966 50 000 0000</span>
              <i className="fas fa-phone"></i>
            </a>
            <a href="mailto:info@daqaiq.com" className="text-sm text-gray-600 hover:text-gray-800">
              <span className="ml-2">info@daqaiq.com</span>
              <i className="fas fa-envelope"></i>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/location" className="text-sm text-gray-600 hover:text-gray-800">
              <span className="ml-2">موقعنا</span>
              <i className="fas fa-map-marker-alt"></i>
            </a>
            <div className="flex items-center space-x-2">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 