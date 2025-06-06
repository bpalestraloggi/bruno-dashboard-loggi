    // Dados dos clientes
const clientsData = [
    { rank: 1, name: "PlayKids", revenue: 1357329.48, deliveries: 179511, ticket: 7.61, status: "Champion", action: "Upsell" },
    { rank: 2, name: "BASILIO UTILIDADES", revenue: 461108.07, deliveries: 40816, ticket: 13.46, status: "Champion", action: "Manter" },
    { rank: 3, name: "MINHA BIBLIOTECA CATOLICA", revenue: 429491.20, deliveries: 52900, ticket: 8.40, status: "Loyal", action: "Upsell" },
    { rank: 4, name: "Forever Liss", revenue: 272041.19, deliveries: 22869, ticket: 12.07, status: "Champion", action: "Manter" },
    { rank: 5, name: "HOPE", revenue: 248846.91, deliveries: 25787, ticket: 9.73, status: "Loyal", action: "Upsell" },
    { rank: 6, name: "DEPOSITO DE MEIAS SAO JORGE", revenue: 210736.56, deliveries: 17022, ticket: 12.42, status: "Champion", action: "Manter" },
    { rank: 7, name: "Lojas Torra", revenue: 144698.06, deliveries: 10251, ticket: 14.22, status: "Loyal", action: "Manter" },
    { rank: 8, name: "DISAL", revenue: 136725.60, deliveries: 14864, ticket: 9.30, status: "Loyal", action: "Upsell" },
    { rank: 9, name: "SumUp", revenue: 102194.93, deliveries: 8799, ticket: 11.62, status: "Potential", action: "Manter" },
    { rank: 10, name: "BOLD SNACKS", revenue: 57978.34, deliveries: 4798, ticket: 17.15, status: "High Value", action: "Expansão" },
    { rank: 11, name: "BIT HOME", revenue: 42816.41, deliveries: 4556, ticket: 15.91, status: "High Value", action: "Expansão" },
    { rank: 12, name: "META IMPRESSÃO", revenue: 33823.80, deliveries: 2469, ticket: 14.02, status: "Potential", action: "Manter" },
    { rank: 13, name: "POSTHAUS", revenue: 13193.88, deliveries: 807, ticket: 17.22, status: "High Value", action: "Expansão" }
];

// Função para mostrar tabs
function showTab(tabName) {
    // Esconder todas as tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remover classe active de todos os botões
    document.querySelectorAll('.tab').forEach(button => {
        button.classList.remove('active');
    });
    
    // Mostrar tab selecionada
    document.getElementById(tabName).classList.add('active');
    
    // Adicionar classe active ao botão clicado
    event.target.classList.add('active');
    
    // Redesenhar gráficos se necessário
    if (tabName === 'trends') {
        setTimeout(() => {
            createMonthlyChart();
            createClientsChart();
        }, 100);
    }
}

// Carregar dados dos clientes na tabela
function loadClientsTable() {
    const tbody = document.getElementById('clientsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    clientsData.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.rank}</td>
            <td><strong>${client.name}</strong></td>
            <td>R$ ${client.revenue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
            <td>${client.deliveries.toLocaleString('pt-BR')}</td>
            <td>R$ ${client.ticket.toFixed(2)}</td>
            <td>${client.status}</td>
            <td><span class="action-badge action-${client.action.toLowerCase()}">${client.action}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Criar gráfico semanal
function createWeeklyChart() {
    const ctx = document.getElementById('weeklyChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5'],
            datasets: [{
                label: 'Receita Semanal',
                data: [492688, 339234, 298456, 339234, 204517],
                borderColor: '#0055FF',
                backgroundColor: 'rgba(0, 85, 255, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toLocaleString('pt-BR');
                        }
                    }
                }
            }
        }
    });
}

// Criar gráfico mensal
function createMonthlyChart() {
    const ctx = document.getElementById('monthlyChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Receita Mensal',
                data: [1800000, 1950000, 2100000, 1750000, 1650000, 205749],
                backgroundColor: [
                    '#10b981', '#10b981', '#10b981', 
                    '#f59e0b', '#ef4444', '#ef4444'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + (value/1000000).toFixed(1) + 'M';
                        }
                    }
                }
            }
        }
    });
}

// Criar gráfico de clientes
function createClientsChart() {
    const ctx = document.getElementById('clientsChart');
    if (!ctx) return;
    
    const top5 = clientsData.slice(0, 5);
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: top5.map(c => c.name),
            datasets: [{
                data: top5.map(c => c.revenue),
                backgroundColor: [
                    '#0055FF', '#3b82f6', '#60a5fa', 
                    '#93c5fd', '#dbeafe'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Atualizar timestamp
function updateTimestamp() {
    const now = new Date();
    const element = document.getElementById('lastUpdate');
    if (element) {
        element.textContent = now.toLocaleString('pt-BR');
    }
}

// Inicializar dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadClientsTable();
    createWeeklyChart();
    updateTimestamp();
    
    // Atualizar timestamp a cada minuto
    setInterval(updateTimestamp, 60000);
});

// Simular atualizações em tempo real
setInterval(() => {
    // Pequenas variações nos dados para simular tempo real
    const variation = (Math.random() - 0.5) * 0.02; // ±1%
    // Aqui você pode implementar atualizações reais via API
}, 30000); // A cada 30 segundos

