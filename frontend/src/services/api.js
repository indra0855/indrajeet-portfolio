const API_BASE = ''; // Relies on Vite proxy configuration in development

export async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE}/api/projects/`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch projects from API, loading fallback static projects:', error);
    // Return high-quality local fallback project list if backend is not responding
    return [
      {
        id: 1,
        title: "Enterprise Document Intelligence System",
        description: "An enterprise-grade AI system capable of processing invoices, resumes, contracts, and reports using OCR and Multi-Agent AI workflows. Solved automated manual document processing, reduced information extraction times, and improved overall document understanding.",
        image_url: "/images/document_intelligence.png",
        github_url: "https://github.com/yourusername/document-intelligence",
        live_url: "#demo-document-intelligence",
        tech_stack: "Python,FastAPI,LangGraph,LangChain,OCR,PostgreSQL,Ollama,RAG,Docker"
      },
      {
        id: 2,
        title: "AI-Powered Skin Cancer Detection",
        description: "A deep learning computer vision application that identifies skin cancer lesions and classifies their types (e.g. Melanoma, Basal Cell Carcinoma) with high accuracy using MobileNetV2. Includes preventive recommendations.",
        image_url: "/images/skin_cancer.png",
        github_url: "https://github.com/yourusername/skin-cancer-detection",
        live_url: "#demo-skin-cancer",
        tech_stack: "Python,TensorFlow,OpenCV,Flask,Deep Learning"
      },
      {
        id: 4,
        title: "Global Food Production Analytics Dashboard",
        description: "An interactive analytical dashboard displaying global food production trends, crop yield distributions, country-level agricultural analyses, and trade flows.",
        image_url: "/images/food_analytics.png",
        github_url: "https://github.com/yourusername/food-production-dashboard",
        live_url: "#demo-food-analytics",
        tech_stack: "Power BI,Python,SQL,Pandas,Plotly"
      }
    ];
  }
}

export async function submitContact(data) {
  const res = await fetch(`${API_BASE}/api/contact/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    const errorDetails = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(errorDetails.detail || `Server responded with status ${res.status}`);
  }
  
  return await res.json();
}
