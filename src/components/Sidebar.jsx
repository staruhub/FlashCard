const Sidebar = ({ activeTab, setActiveTab }) => {
  const sidebarStyles = {
    container: {
      width: '200px',
      height: '100vh',
      backgroundColor: '#343a40',
      color: 'white',
      padding: '20px 0',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '30px',
      padding: '0 10px',
    },
    nav: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    navItem: {
      padding: '15px 20px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      display: 'flex',
      alignItems: 'center',
    },
    activeNavItem: {
      backgroundColor: '#495057',
      borderLeft: '4px solid #007bff',
    },
    icon: {
      marginRight: '10px',
      fontSize: '18px',
    }
  };

  const navItems = [
    { id: 'create', label: '创建闪卡', icon: '✏️' },
    { id: 'search', label: '搜索闪卡', icon: '🔍' },
    { id: 'review', label: '复习闪卡', icon: '📚' },
    { id: 'stats', label: '学习统计', icon: '📊' },
    { id: 'mcp', label: 'MCP工具', icon: '🤖' },
  ];

  return (
    <div style={sidebarStyles.container}>
      <div style={sidebarStyles.title}>英语学习闪卡</div>
      <ul style={sidebarStyles.nav}>
        {navItems.map(item => (
          <li
            key={item.id}
            style={{
              ...sidebarStyles.navItem,
              ...(activeTab === item.id ? sidebarStyles.activeNavItem : {})
            }}
            onClick={() => setActiveTab(item.id)}
          >
            <span style={sidebarStyles.icon}>{item.icon}</span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
