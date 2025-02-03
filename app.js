// API Configuration
const BASE_URL = 'https://api.exchangerate-api.com/v4';
const API_KEY = 'YOUR_API_KEY'; // Free API key from exchangerate-api.com

// DOM Elements
const amount = document.getElementById('amount');
const fromCurrencyBtn = document.getElementById('fromCurrencyBtn');
const toCurrencyBtn = document.getElementById('toCurrencyBtn');
const fromCurrencyDropdown = document.getElementById('fromCurrencyDropdown');
const toCurrencyDropdown = document.getElementById('toCurrencyDropdown');
const fromCurrencyCode = document.getElementById('fromCurrencyCode');
const toCurrencyCode = document.getElementById('toCurrencyCode');
const fromCurrencyName = document.getElementById('fromCurrencyName');
const toCurrencyName = document.getElementById('toCurrencyName');
const result = document.getElementById('result');
const swapBtn = document.getElementById('swapBtn');
const dateSelector = document.getElementById('dateSelector');
const rateType = document.getElementById('rateType');
const bidRate = document.getElementById('bidRate');
const avgRate = document.getElementById('avgRate');
const askRate = document.getElementById('askRate');

// Currency data with flags
const currencies = {
    // North America
    'USD': { name: 'US Dollar', flag: '🇺🇸' },
    'CAD': { name: 'Canadian Dollar', flag: '🇨🇦' },
    'MXN': { name: 'Mexican Peso', flag: '🇲🇽' },
    'XCD': { name: 'East Caribbean Dollar', flag: '🇦🇬' },
    'JMD': { name: 'Jamaican Dollar', flag: '🇯🇲' },
    'BBD': { name: 'Barbadian Dollar', flag: '🇧🇧' },
    'BSD': { name: 'Bahamian Dollar', flag: '🇧🇸' },
    'BZD': { name: 'Belize Dollar', flag: '🇧🇿' },
    'CRC': { name: 'Costa Rican Colón', flag: '🇨🇷' },
    'CUP': { name: 'Cuban Peso', flag: '🇨🇺' },
    'DOP': { name: 'Dominican Peso', flag: '🇩🇴' },
    'GTQ': { name: 'Guatemalan Quetzal', flag: '🇬🇹' },
    'HNL': { name: 'Honduran Lempira', flag: '🇭🇳' },
    'HTG': { name: 'Haitian Gourde', flag: '🇭🇹' },
    'NIO': { name: 'Nicaraguan Córdoba', flag: '🇳🇮' },
    'PAB': { name: 'Panamanian Balboa', flag: '🇵🇦' },
    'TTD': { name: 'Trinidad and Tobago Dollar', flag: '🇹🇹' },

    // South America
    'ARS': { name: 'Argentine Peso', flag: '🇦🇷' },
    'BOB': { name: 'Bolivian Boliviano', flag: '🇧🇴' },
    'BRL': { name: 'Brazilian Real', flag: '🇧🇷' },
    'CLP': { name: 'Chilean Peso', flag: '🇨🇱' },
    'COP': { name: 'Colombian Peso', flag: '🇨🇴' },
    'GYD': { name: 'Guyanese Dollar', flag: '🇬🇾' },
    'PEN': { name: 'Peruvian Sol', flag: '🇵🇪' },
    'PYG': { name: 'Paraguayan Guaraní', flag: '🇵🇾' },
    'SRD': { name: 'Surinamese Dollar', flag: '🇸🇷' },
    'UYU': { name: 'Uruguayan Peso', flag: '🇺🇾' },
    'VES': { name: 'Venezuelan Bolívar', flag: '🇻🇪' },

    // Europe
    'EUR': { name: 'Euro', flag: '🇪🇺' },
    'GBP': { name: 'British Pound', flag: '🇬🇧' },
    'CHF': { name: 'Swiss Franc', flag: '🇨🇭' },
    'ALL': { name: 'Albanian Lek', flag: '🇦🇱' },
    'AMD': { name: 'Armenian Dram', flag: '🇦🇲' },
    'AZN': { name: 'Azerbaijani Manat', flag: '🇦🇿' },
    'BAM': { name: 'Bosnia-Herzegovina Mark', flag: '🇧🇦' },
    'BGN': { name: 'Bulgarian Lev', flag: '🇧🇬' },
    'BYN': { name: 'Belarusian Ruble', flag: '🇧🇾' },
    'CZK': { name: 'Czech Koruna', flag: '🇨🇿' },
    'DKK': { name: 'Danish Krone', flag: '🇩🇰' },
    'GEL': { name: 'Georgian Lari', flag: '🇬🇪' },
    'HRK': { name: 'Croatian Kuna', flag: '🇭🇷' },
    'HUF': { name: 'Hungarian Forint', flag: '🇭🇺' },
    'ISK': { name: 'Icelandic Króna', flag: '🇮🇸' },
    'MDL': { name: 'Moldovan Leu', flag: '🇲🇩' },
    'MKD': { name: 'Macedonian Denar', flag: '🇲🇰' },
    'NOK': { name: 'Norwegian Krone', flag: '🇳🇴' },
    'PLN': { name: 'Polish Złoty', flag: '🇵🇱' },
    'RON': { name: 'Romanian Leu', flag: '🇷🇴' },
    'RSD': { name: 'Serbian Dinar', flag: '🇷🇸' },
    'SEK': { name: 'Swedish Krona', flag: '🇸🇪' },
    'UAH': { name: 'Ukrainian Hryvnia', flag: '🇺🇦' },

    // Asia
    'JPY': { name: 'Japanese Yen', flag: '🇯🇵' },
    'CNY': { name: 'Chinese Yuan', flag: '🇨🇳' },
    'HKD': { name: 'Hong Kong Dollar', flag: '🇭🇰' },
    'IDR': { name: 'Indonesian Rupiah', flag: '🇮🇩' },
    'INR': { name: 'Indian Rupee', flag: '🇮🇳' },
    'KRW': { name: 'South Korean Won', flag: '🇰🇷' },
    'MYR': { name: 'Malaysian Ringgit', flag: '🇲🇾' },
    'PHP': { name: 'Philippine Peso', flag: '🇵🇭' },
    'SGD': { name: 'Singapore Dollar', flag: '🇸🇬' },
    'THB': { name: 'Thai Baht', flag: '🇹🇭' },
    'VND': { name: 'Vietnamese Dong', flag: '🇻🇳' },
    'BDT': { name: 'Bangladeshi Taka', flag: '🇧🇩' },
    'BHD': { name: 'Bahraini Dinar', flag: '🇧🇭' },
    'ILS': { name: 'Israeli New Shekel', flag: '🇮🇱' },
    'IQD': { name: 'Iraqi Dinar', flag: '🇮🇶' },
    'JOD': { name: 'Jordanian Dinar', flag: '🇯🇴' },
    'KWD': { name: 'Kuwaiti Dinar', flag: '🇰🇼' },
    'LBP': { name: 'Lebanese Pound', flag: '🇱🇧' },
    'OMR': { name: 'Omani Rial', flag: '🇴🇲' },
    'QAR': { name: 'Qatari Riyal', flag: '🇶🇦' },
    'SAR': { name: 'Saudi Riyal', flag: '🇸🇦' },
    'AED': { name: 'UAE Dirham', flag: '🇦🇪' },
    'AFN': { name: 'Afghan Afghani', flag: '🇦🇫' },
    'PKR': { name: 'Pakistani Rupee', flag: '🇵🇰' },
    'LKR': { name: 'Sri Lankan Rupee', flag: '🇱🇰' },
    'MMK': { name: 'Myanmar Kyat', flag: '🇲🇲' },
    'NPR': { name: 'Nepalese Rupee', flag: '🇳🇵' },
    'KHR': { name: 'Cambodian Riel', flag: '🇰🇭' },
    'LAK': { name: 'Laotian Kip', flag: '🇱🇦' },
    'MNT': { name: 'Mongolian Tugrik', flag: '🇲🇳' },

    // Oceania
    'AUD': { name: 'Australian Dollar', flag: '🇦🇺' },
    'NZD': { name: 'New Zealand Dollar', flag: '🇳🇿' },
    'FJD': { name: 'Fijian Dollar', flag: '🇫🇯' },
    'PGK': { name: 'Papua New Guinean Kina', flag: '🇵🇬' },
    'SBD': { name: 'Solomon Islands Dollar', flag: '🇸🇧' },
    'TOP': { name: 'Tongan Paʻanga', flag: '🇹🇴' },
    'VUV': { name: 'Vanuatu Vatu', flag: '🇻🇺' },
    'WST': { name: 'Samoan Tala', flag: '🇼🇸' },

    // Africa
    'ZAR': { name: 'South African Rand', flag: '🇿🇦' },
    'EGP': { name: 'Egyptian Pound', flag: '🇪🇬' },
    'GHS': { name: 'Ghanaian Cedi', flag: '🇬🇭' },
    'KES': { name: 'Kenyan Shilling', flag: '🇰🇪' },
    'MAD': { name: 'Moroccan Dirham', flag: '🇲🇦' },
    'NGN': { name: 'Nigerian Naira', flag: '🇳🇬' },
    'TND': { name: 'Tunisian Dinar', flag: '🇹🇳' },
    'UGX': { name: 'Ugandan Shilling', flag: '🇺🇬' },
    'DZD': { name: 'Algerian Dinar', flag: '🇩🇿' },
    'AOA': { name: 'Angolan Kwanza', flag: '🇦🇴' },
    'BWP': { name: 'Botswanan Pula', flag: '🇧🇼' },
    'BIF': { name: 'Burundian Franc', flag: '🇧🇮' },
    'CVE': { name: 'Cape Verdean Escudo', flag: '🇨🇻' },
    'KMF': { name: 'Comorian Franc', flag: '🇰🇲' },
    'ETB': { name: 'Ethiopian Birr', flag: '🇪🇹' },
    'GMD': { name: 'Gambian Dalasi', flag: '🇬🇲' },
    'GNF': { name: 'Guinean Franc', flag: '🇬🇳' },
    'LSL': { name: 'Lesotho Loti', flag: '🇱🇸' },
    'LRD': { name: 'Liberian Dollar', flag: '🇱🇷' },
    'LYD': { name: 'Libyan Dinar', flag: '🇱🇾' },
    'MWK': { name: 'Malawian Kwacha', flag: '🇲🇼' },
    'MUR': { name: 'Mauritian Rupee', flag: '🇲🇺' },
    'MZN': { name: 'Mozambican Metical', flag: '🇲🇿' },
    'NAD': { name: 'Namibian Dollar', flag: '🇳🇦' },
    'RWF': { name: 'Rwandan Franc', flag: '🇷🇼' },
    'SLL': { name: 'Sierra Leonean Leone', flag: '🇸🇱' },
    'SOS': { name: 'Somali Shilling', flag: '🇸🇴' },
    'SDG': { name: 'Sudanese Pound', flag: '🇸🇩' },
    'SZL': { name: 'Swazi Lilangeni', flag: '🇸🇿' },
    'TZS': { name: 'Tanzanian Shilling', flag: '🇹🇿' },
    'ZMW': { name: 'Zambian Kwacha', flag: '🇿🇲' },
    'ZWL': { name: 'Zimbabwean Dollar', flag: '🇿🇼' }
};

// Global chart instance
let rateChart = null;

// Global variables for real-time updates
let chartUpdateInterval;
let currentPeriod = 30;
let lastRate = null;

// Initialize chart with default data
function initializeChart() {
    const ctx = document.getElementById('rateChart');
    if (!ctx) return;

    if (rateChart) {
        rateChart.destroy();
    }

    rateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Exchange Rate',
                data: [],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea, scales } = chart;
                    if (!chartArea) return null;
                    
                    // Create gradient
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
                    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
                    return gradient;
                },
                fill: true,
                tension: 0.3,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#000',
                    bodyColor: '#000',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        title: function(tooltipItems) {
                            return tooltipItems[0].label;
                        },
                        label: function(context) {
                            return `Rate: ${context.parsed.y.toFixed(5)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxRotation: 0,
                        maxTicksLimit: 6,
                        padding: 10,
                        color: '#666',
                        font: {
                            size: 11
                        }
                    },
                    border: {
                        display: false
                    }
                },
                y: {
                    position: 'right',
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        padding: 10,
                        color: '#666',
                        font: {
                            size: 11
                        },
                        callback: (value) => value.toFixed(5),
                        maxTicksLimit: 6
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 750
            },
            elements: {
                line: {
                    tension: 0.4
                }
            }
        }
    });
}

// Update historical chart with real-time data
async function updateHistoricalChart(fromCurrency, toCurrency, days = 30) {
    try {
        currentPeriod = days;
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days);

        const endDateStr = formatDate(endDate);
        const startDateStr = formatDate(startDate);

        // Initialize chart if it doesn't exist
        if (!rateChart) {
            initializeChart();
        }

        // Show loading state
        if (rateChart) {
            rateChart.data.labels = [];
            rateChart.data.datasets[0].data = [];
            rateChart.update('none');
        }

        // Add time period buttons if they don't exist
        const chartContainer = document.getElementById('rateChart').parentElement;
        if (!document.getElementById('timePeriodButtons')) {
            const buttonContainer = document.createElement('div');
            buttonContainer.id = 'timePeriodButtons';
            buttonContainer.className = 'flex gap-2 mt-4 justify-center';
            buttonContainer.innerHTML = `
                <button class="px-4 py-1 rounded-full bg-gray-100 hover:bg-gray-200 active" data-period="30">30D</button>
                <button class="px-4 py-1 rounded-full bg-gray-100 hover:bg-gray-200" data-period="60">60D</button>
                <button class="px-4 py-1 rounded-full bg-gray-100 hover:bg-gray-200" data-period="90">90D</button>
            `;
            chartContainer.appendChild(buttonContainer);

            // Add click handlers for period buttons
            buttonContainer.addEventListener('click', (e) => {
                if (e.target.matches('button')) {
                    const selectedDays = parseInt(e.target.dataset.period);
                    // Update active state
                    buttonContainer.querySelectorAll('button').forEach(btn => {
                        btn.classList.remove('active', 'bg-blue-500', 'text-white');
                        btn.classList.add('bg-gray-100');
                    });
                    e.target.classList.remove('bg-gray-100');
                    e.target.classList.add('active', 'bg-blue-500', 'text-white');
                    // Update chart with new period
                    updateHistoricalChart(fromCurrency, toCurrency, selectedDays);
                }
            });
        }

        // Fetch historical data
        const response = await fetch(`https://api.exchangerate.host/timeseries?start_date=${startDateStr}&end_date=${endDateStr}&base=${fromCurrency}&symbols=${toCurrency}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch historical data');
        }

        const data = await response.json();

        if (data && data.rates) {
            const chartData = Object.entries(data.rates)
                .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
                .map(([date, rates]) => ({
                    date: new Date(date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    }),
                    rate: rates[toCurrency]
                }))
                .filter(item => item.rate !== undefined);

            if (chartData.length === 0) {
                throw new Error('No historical data available');
            }

            // Store the last rate for real-time updates
            lastRate = chartData[chartData.length - 1].rate;

            // Update chart with new data
            updateChartData(chartData, fromCurrency, toCurrency);

            // Setup real-time updates
            setupRealTimeUpdates(fromCurrency, toCurrency);
        }
    } catch (error) {
        console.error('Chart error:', error);
        
        // Show error message on canvas
        const ctx = document.getElementById('rateChart').getContext('2d');
        if (ctx) {
            if (rateChart) {
                rateChart.destroy();
                rateChart = null;
            }
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.font = '14px Arial';
            ctx.fillStyle = '#ef4444';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Failed to load historical data. Please try again later.', ctx.canvas.width / 2, ctx.canvas.height / 2);
        }
    }
}

// Update chart data and styling
function updateChartData(chartData, fromCurrency, toCurrency) {
    if (!rateChart) return;

    // Calculate rate changes
    const rates = chartData.map(item => item.rate);
    const rateChanges = rates.map((rate, index) => {
        if (index === 0) return 0;
        return rate - rates[index - 1];
    });

    // Calculate proper min/max for better visualization
    const min = Math.min(...rates);
    const max = Math.max(...rates);
    const range = max - min;
    const padding = range * 0.1;
    const minDisplay = min - padding;
    const maxDisplay = max + padding;

    // Update data with rate change indicators
    rateChart.data.labels = chartData.map(item => item.date);
    rateChart.data.datasets[0].label = `${fromCurrency}/${toCurrency}`;
    rateChart.data.datasets[0].data = rates;

    // Add rate change indicators
    const lastRate = rates[rates.length - 1];
    const previousRate = rates[rates.length - 2];
    const rateChange = lastRate - previousRate;
    const rateChangePercent = ((rateChange / previousRate) * 100).toFixed(2);
    const isPositive = rateChange >= 0;

    // Create or update rate change display
    let rateChangeElement = document.getElementById('rateChangeIndicator');
    if (!rateChangeElement) {
        rateChangeElement = document.createElement('div');
        rateChangeElement.id = 'rateChangeIndicator';
        rateChangeElement.className = 'text-sm font-medium flex items-center justify-end mt-2';
        const chartContainer = document.getElementById('rateChart').parentElement;
        chartContainer.appendChild(rateChangeElement);
    }

    // Update rate change indicator
    rateChangeElement.innerHTML = `
        <div class="flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}">
            <span class="mr-1">${isPositive ? '▲' : '▼'}</span>
            <span>${Math.abs(rateChangePercent)}%</span>
        </div>
    `;

    // Update scales
    rateChart.options.scales.y.min = minDisplay;
    rateChart.options.scales.y.max = maxDisplay;
    rateChart.options.scales.y.ticks.stepSize = range / 5;

    // Update tooltip to show rate changes
    rateChart.options.plugins.tooltip = {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
            title: function(tooltipItems) {
                return tooltipItems[0].label;
            },
            label: function(context) {
                const index = context.dataIndex;
                const rate = context.parsed.y;
                const change = rateChanges[index];
                const changePercent = index > 0 ? ((change / rates[index - 1]) * 100).toFixed(2) : '0.00';
                const changeSymbol = change >= 0 ? '▲' : '▼';
                const changeColor = change >= 0 ? 'green' : 'red';
                
                return [
                    `Rate: ${rate.toFixed(5)}`,
                    `Change: ${changeSymbol} ${Math.abs(changePercent)}%`
                ];
            }
        }
    };

    // Update line gradient based on overall trend
    const overallChange = rates[rates.length - 1] - rates[0];
    const gradientColors = overallChange >= 0 ? 
        ['rgba(34, 197, 94, 0.2)', 'rgba(34, 197, 94, 0)'] : 
        ['rgba(239, 68, 68, 0.2)', 'rgba(239, 68, 68, 0)'];

    rateChart.data.datasets[0].backgroundColor = (context) => {
        const chart = context.chart;
        const {ctx, chartArea} = chart;
        if (!chartArea) return null;
        
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, gradientColors[0]);
        gradient.addColorStop(1, gradientColors[1]);
        return gradient;
    };

    rateChart.data.datasets[0].borderColor = overallChange >= 0 ? 
        'rgb(34, 197, 94)' : 'rgb(239, 68, 68)';

    rateChart.update('active');
}

// Setup real-time updates
function setupRealTimeUpdates(fromCurrency, toCurrency) {
    // Clear existing interval
    if (chartUpdateInterval) {
        clearInterval(chartUpdateInterval);
    }

    // Keep track of the last few rates for trend
    let rateHistory = [];
    const maxHistoryLength = currentPeriod || 30;

    // Initialize rate history with current data
    if (rateChart && rateChart.data.datasets[0].data.length > 0) {
        rateHistory = [...rateChart.data.datasets[0].data];
    }

    // Update every 10 seconds
    chartUpdateInterval = setInterval(async () => {
        try {
            const response = await fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`);
            const data = await response.json();

            if (data && data.rates && data.rates[toCurrency]) {
                const newRate = data.rates[toCurrency];
                const now = new Date();
                
                // Only update if we have a new rate
                if (newRate !== rateHistory[rateHistory.length - 1]) {
                    // Add new rate to history
                    rateHistory.push(newRate);
                    
                    // Keep only the last N rates
                    if (rateHistory.length > maxHistoryLength) {
                        rateHistory.shift();
                    }

                    // Update chart if it exists
                    if (rateChart && rateChart.data.labels.length > 0) {
                        // Update labels
                        const newLabel = now.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        });
                        rateChart.data.labels.push(newLabel);
                        if (rateChart.data.labels.length > maxHistoryLength) {
                            rateChart.data.labels.shift();
                        }

                        // Calculate rate change
                        const previousRate = rateHistory[rateHistory.length - 2];
                        const rateChange = newRate - previousRate;
                        const rateChangePercent = ((rateChange / previousRate) * 100).toFixed(2);
                        const isPositive = rateChange >= 0;

                        // Update rate change indicator
                        const rateChangeElement = document.getElementById('rateChangeIndicator');
                        if (rateChangeElement) {
                            rateChangeElement.innerHTML = `
                                <div class="flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}">
                                    <span class="mr-1">${isPositive ? '▲' : '▼'}</span>
                                    <span>${Math.abs(rateChangePercent)}%</span>
                                </div>
                            `;
                        }

                        // Update dataset with color changes
                        const overallChange = newRate - rateHistory[0];
                        rateChart.data.datasets[0].borderColor = overallChange >= 0 ? 
                            'rgb(34, 197, 94)' : 'rgb(239, 68, 68)';

                        rateChart.data.datasets[0].data = [...rateHistory];

                        // Update scales for better visualization
                        const min = Math.min(...rateHistory);
                        const max = Math.max(...rateHistory);
                        const range = max - min;
                        const padding = range * 0.1;

                        rateChart.options.scales.y.min = min - padding;
                        rateChart.options.scales.y.max = max + padding;
                        rateChart.options.scales.y.ticks.stepSize = range / 5;

                        // Smooth animation for updates
                        rateChart.update('active');
                    }
                }
            }
        } catch (error) {
            console.error('Real-time update error:', error);
        }
    }, 10000); // 10 seconds interval
}

// Clean up interval when changing currencies
function cleanupRealTimeUpdates() {
    if (chartUpdateInterval) {
        clearInterval(chartUpdateInterval);
        chartUpdateInterval = null;
    }
}

// Function to format dates for the API
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Update conversion and rates
async function updateConversion() {
    const fromCurrency = fromCurrencyCode.textContent;
    const toCurrency = toCurrencyCode.textContent;
    const amountValue = parseFloat(amount.value) || 1;

    // Show loading state
    result.textContent = 'Converting...';
    bidRate.textContent = '-';
    avgRate.textContent = '-';
    askRate.textContent = '-';

    // List of API endpoints to try in order
    const apis = [
        {
            url: `https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`,
            handler: (data) => data.rates[toCurrency]
        },
        {
            url: `https://open.er-api.com/v6/latest/${fromCurrency}`,
            handler: (data) => data.rates[toCurrency]
        },
        {
            url: `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency.toLowerCase()}/${toCurrency.toLowerCase()}.json`,
            handler: (data) => data[toCurrency.toLowerCase()]
        }
    ];

    // Try each API in sequence until one works
    for (const api of apis) {
        try {
            const response = await fetch(api.url);
            if (!response.ok) continue;

            const data = await response.json();
            const rate = api.handler(data);

            if (rate) {
                const convertedAmount = amountValue * rate;

                // Format the result
                const formatter = new Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6
                });

                // Update the conversion result
                result.textContent = `${formatter.format(convertedAmount)} ${toCurrency}`;

                // Format and display rates
                const rateFormatter = new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 4,
                    maximumFractionDigits: 6
                });

                // Calculate and show bid/ask spread
                const spreadPercentage = 0.001; // 0.1% spread
                const bidRateValue = rate * (1 - spreadPercentage);
                const askRateValue = rate * (1 + spreadPercentage);

                bidRate.textContent = rateFormatter.format(bidRateValue);
                avgRate.textContent = rateFormatter.format(rate);
                askRate.textContent = rateFormatter.format(askRateValue);

                // Update the chart
                updateHistoricalChart(fromCurrency, toCurrency);
                return; // Success! Exit the function
            }
        } catch (error) {
            console.error(`API error (${api.url}):`, error);
            // Continue to next API
        }
    }

    // If we get here, all APIs failed
    console.error('All APIs failed');
    
    // Try one last fallback with a simple calculation for common currencies
    const commonRates = {
        'EUR': { 'USD': 1.08, 'GBP': 0.85, 'JPY': 158.77, 'CNY': 7.78 },
        'USD': { 'EUR': 0.93, 'GBP': 0.79, 'JPY': 147.35, 'CNY': 7.18 },
        'GBP': { 'EUR': 1.17, 'USD': 1.27, 'JPY': 186.91, 'CNY': 9.13 }
    };

    if (commonRates[fromCurrency]?.[toCurrency]) {
        const rate = commonRates[fromCurrency][toCurrency];
        const convertedAmount = amountValue * rate;
        
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 6
        });
        
        result.textContent = `${formatter.format(convertedAmount)} ${toCurrency} (Approximate)`;
        
        const rateFormatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 4,
            maximumFractionDigits: 6
        });
        
        bidRate.textContent = rateFormatter.format(rate * 0.999);
        avgRate.textContent = rateFormatter.format(rate);
        askRate.textContent = rateFormatter.format(rate * 1.001);
        
        updateHistoricalChart(fromCurrency, toCurrency);
    } else {
        // All attempts failed
        result.textContent = `Could not convert ${fromCurrency} to ${toCurrency}`;
        bidRate.textContent = '-';
        avgRate.textContent = '-';
        askRate.textContent = '-';
    }
}

// Currency dropdown handlers
function createCurrencyList(dropdownElement, currentCode) {
    const listContainer = dropdownElement.querySelector('.currency-list');
    const searchInput = dropdownElement.querySelector('.currency-search');
    const searchTerm = (searchInput?.value || '').toLowerCase();

    // Clear the list
    listContainer.innerHTML = '';

    // Filter and create currency items
    Object.entries(currencies)
        .filter(([code, currency]) => {
            const term = searchTerm.toLowerCase();
            return code.toLowerCase().includes(term) ||
                currency.name.toLowerCase().includes(term);
        })
        .forEach(([code, currency]) => {
            const item = document.createElement('div');
            item.className = `currency-item p-2 hover:bg-gray-100 cursor-pointer flex items-center ${code === currentCode ? 'bg-gray-100' : ''}`;
            item.innerHTML = `
                <span class="mr-2">${currency.flag}</span>
                <span class="font-medium">${code}</span>
                <span class="ml-2 text-gray-500">${currency.name}</span>
            `;

            item.addEventListener('click', () => {
                const isFromCurrency = dropdownElement.id === 'fromCurrencyDropdown';
                
                // Clean up existing real-time updates
                cleanupRealTimeUpdates();

                if (isFromCurrency) {
                    fromCurrencyCode.textContent = code;
                    fromCurrencyName.textContent = currency.name;
                } else {
                    toCurrencyCode.textContent = code;
                    toCurrencyName.textContent = currency.name;
                }

                dropdownElement.classList.add('hidden');
                updateConversion();
            });

            listContainer.appendChild(item);
        });
}

// Add event listener for swap button with real-time update handling
swapBtn.addEventListener('click', () => {
    // Clean up existing real-time updates
    cleanupRealTimeUpdates();

    const tempCode = fromCurrencyCode.textContent;
    const tempName = fromCurrencyName.textContent;
    fromCurrencyCode.textContent = toCurrencyCode.textContent;
    fromCurrencyName.textContent = toCurrencyName.textContent;
    toCurrencyCode.textContent = tempCode;
    toCurrencyName.textContent = tempName;
    updateConversion();
});

// Add event listeners for amount input
amount.addEventListener('input', () => {
    updateConversion();
});

// Add event listeners for currency dropdowns
fromCurrencyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fromCurrencyDropdown.classList.toggle('hidden');
    toCurrencyDropdown.classList.add('hidden');
    const searchInput = fromCurrencyDropdown.querySelector('.currency-search');
    if (searchInput && fromCurrencyDropdown.classList.contains('hidden') === false) {
        searchInput.value = '';
        searchInput.focus();
        createCurrencyList(fromCurrencyDropdown, fromCurrencyCode.textContent);
    }
});

toCurrencyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toCurrencyDropdown.classList.toggle('hidden');
    fromCurrencyDropdown.classList.add('hidden');
    const searchInput = toCurrencyDropdown.querySelector('.currency-search');
    if (searchInput && toCurrencyDropdown.classList.contains('hidden') === false) {
        searchInput.value = '';
        searchInput.focus();
        createCurrencyList(toCurrencyDropdown, toCurrencyCode.textContent);
    }
});

// Add event listeners for search inputs
const fromSearch = fromCurrencyDropdown.querySelector('.currency-search');
const toSearch = toCurrencyDropdown.querySelector('.currency-search');

if (fromSearch) {
    fromSearch.addEventListener('input', (e) => {
        e.stopPropagation();
        createCurrencyList(fromCurrencyDropdown, fromCurrencyCode.textContent);
    });
    fromSearch.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

if (toSearch) {
    toSearch.addEventListener('input', (e) => {
        e.stopPropagation();
        createCurrencyList(toCurrencyDropdown, toCurrencyCode.textContent);
    });
    toSearch.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
        fromCurrencyDropdown.classList.add('hidden');
        toCurrencyDropdown.classList.add('hidden');
    }
});

// Initialize currency lists
createCurrencyList(fromCurrencyDropdown, fromCurrencyCode.textContent);
createCurrencyList(toCurrencyDropdown, toCurrencyCode.textContent);

// Initial conversion
updateConversion();
