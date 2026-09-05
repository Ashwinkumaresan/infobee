import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "App.settings")
django.setup()

from academy.models import ResearchPaper

papers_data = [
  {
    "title": 'Hybrid Federated Learning for Edge Intelligence in 6G Networks',
    "authors": ['Dr. Aris Thorne', 'Elias Vance', 'Sarah Chen'],
    "author_type": 'Faculty',
    "journal": 'IEEE Transactions on Mobile Computing',
    "publisher": 'IEEE',
    "year": 2024,
    "domain": 'AI',
    "citations": 42,
    "featured": True,
    "abstract": 'In this paper, we propose a novel hybrid federated learning framework designed for bandwidth-constrained 6G edge environments. By combining local gradient compression with asynchronous server aggregation, the scheme achieves a 48% reduction in latency while maintaining 99.1% accuracy on decentralized computer vision tasks.',
    "doi": '10.1109/TMC.2024.3389120',
    "pdf_url": 'https://arxiv.org/pdf/2401.00001',
    "keywords": ['Federated Learning', '6G Networks', 'Edge Intelligence', 'Gradient Compression']
  },
  {
    "title": 'Zero-Knowledge Proofs for Privacy-Preserving IoT Telemetry',
    "authors": ['Marcus Thorne', 'Dr. Helena Ross'],
    "author_type": 'Student',
    "journal": 'ACM SIGCOMM 2023',
    "publisher": 'ACM',
    "year": 2023,
    "domain": 'IoT',
    "citations": 18,
    "featured": True,
    "is_dark_featured": True,
    "abstract": 'IoT devices emit sensitive sensory data that can expose operational secrets. We introduce ZK-Telemetry, a succinct non-interactive zero-knowledge proof system optimized for microcontrollers with under 256KB RAM, allowing sensor validation without revealing physical telemetry payloads.',
    "doi": '10.1145/3603269.3604821',
    "pdf_url": 'https://arxiv.org/pdf/2308.00022',
    "keywords": ['Zero-Knowledge Proofs', 'IoT Privacy', 'Cryptography', 'Microcontrollers']
  },
  {
    "title": 'Quantized Neural Networks for Real-time Malware Detection',
    "authors": ['Dr. Linus Torv', 'Sofia Bell'],
    "author_type": 'Faculty',
    "journal": 'Elsevier Journal of Systems & Software',
    "publisher": 'Elsevier',
    "year": 2024,
    "domain": 'AI',
    "citations": 29,
    "featured": True,
    "abstract": 'Endpoint security agents demand sub-millisecond execution without depleting battery life. This paper introduces 4-bit integer quantized Convolutional-Transformer architectures capable of inspecting binary opcodes in real-time with 0.02ms inference overhead.',
    "doi": '10.1016/j.jss.2024.111982',
    "pdf_url": 'https://arxiv.org/pdf/2402.00045',
    "keywords": ['Quantized Neural Networks', 'Malware Detection', 'Cybersecurity', 'Model Optimization']
  },
  {
    "title": 'Advanced Packet Filtering in SDN Architectures',
    "authors": ['Kevin Smith', 'Dr. J. Doe'],
    "author_type": 'Faculty',
    "journal": 'Springer Nature Computer Science',
    "publisher": 'Springer',
    "year": 2023,
    "domain": 'Networking',
    "citations": 12,
    "abstract": 'Software-Defined Networks require ultra-low latency packet inspection engines. We demonstrate eBPF-accelerated flow tracking that reduces packet drop rates by 62% during terabit DDoS floods.',
    "doi": '10.1007/s42979-023-01822-y',
    "pdf_url": 'https://arxiv.org/pdf/2305.00112',
    "keywords": ['SDN', 'Packet Filtering', 'eBPF', 'Network Security']
  },
  {
    "title": 'Edge-based AI for Forest Fire Detection',
    "authors": ['Alice Wang', 'Dr. S. Priya'],
    "author_type": 'Student',
    "journal": 'IEEE Sensors Journal',
    "publisher": 'IEEE',
    "year": 2024,
    "domain": 'IoT',
    "citations": 8,
    "abstract": 'Deploying thermal infrared camera nodes powered by solar panels across dense forest reserves allows early wildfire detection. Our tinyML algorithm detects thermal hotspots within 1.2 seconds of flame ignition.',
    "doi": '10.1109/JSEN.2024.3356012',
    "pdf_url": 'https://arxiv.org/pdf/2403.00891',
    "keywords": ['Edge AI', 'Wildfire Detection', 'TinyML', 'Thermal Sensors']
  },
  {
    "title": 'Blockchain Interoperability Standards',
    "authors": ['Dr. Greg White', 'Tim Cook'],
    "author_type": 'Faculty',
    "journal": 'IEEE Computer Society',
    "publisher": 'IEEE',
    "year": 2022,
    "domain": 'Networking',
    "citations": 31,
    "abstract": 'Cross-chain atomic swaps often suffer from locking deadlocks and high gas overheads. This research formulates a lightweight decentralized relayer network protocol using state-verification proofs.',
    "doi": '10.1109/MC.2022.3190823',
    "pdf_url": 'https://arxiv.org/pdf/2209.00311',
    "keywords": ['Blockchain', 'Interoperability', 'Cross-Chain', 'Smart Contracts']
  },
  {
    "title": 'Optimizing Transformer Models for Embedded Edge Vision Systems',
    "authors": ['Pranesh Kumar S', 'Dr. R. Loganathan'],
    "author_type": 'Student',
    "journal": 'Springer Applied Intelligence',
    "publisher": 'Springer',
    "year": 2025,
    "domain": 'AI',
    "citations": 15,
    "abstract": 'Vision Transformers (ViT) are notoriously compute-heavy. By introducing dynamic patch pruning and depthwise separable self-attention, we achieve 45 FPS on Raspberry Pi 5 edge devices.',
    "doi": '10.1007/s10489-025-05201-1',
    "pdf_url": 'https://arxiv.org/pdf/2501.00412',
    "keywords": ['Vision Transformer', 'Edge Computing', 'Patch Pruning', 'Embedded AI']
  },
  {
    "title": 'Lightweight Cryptographic Protocols for Vehicle-to-Everything (V2X) Networks',
    "authors": ['Dr. S. Priya', 'Samyuktha M'],
    "author_type": 'Faculty',
    "journal": 'IEEE Transactions on Intelligent Transportation Systems',
    "publisher": 'IEEE',
    "year": 2024,
    "domain": 'Networking',
    "citations": 22,
    "abstract": 'Autonomous vehicles need sub-10ms signature verification for collision avoidance messages. We design an elliptic curve signcryption scheme resilient against impersonation and replay attacks.',
    "doi": '10.1109/TITS.2024.3392102',
    "pdf_url": 'https://arxiv.org/pdf/2404.00192',
    "keywords": ['V2X', 'Elliptic Curve', 'Automotive Security', 'Signcryption']
  },
  {
    "title": 'Autonomous Anomaly Detection in Cloud Microservice Swarms',
    "authors": ['Deepika R', 'Dr. P. Govindasamy'],
    "author_type": 'Student',
    "journal": 'Elsevier Cloud Computing Journal',
    "publisher": 'Elsevier',
    "year": 2024,
    "domain": 'Cloud',
    "citations": 11,
    "abstract": 'Analyzing distributed OpenTelemetry traces across thousands of Kubernetes pods is challenging. We leverage Graph Neural Networks (GNN) to pinpoint root-cause service failures automatically.',
    "doi": '10.1016/j.clcom.2024.100142',
    "pdf_url": 'https://arxiv.org/pdf/2405.00612',
    "keywords": ['Cloud Computing', 'Graph Neural Networks', 'Microservices', 'Kubernetes']
  }
]

for item in papers_data:
    ResearchPaper.objects.get_or_create(
        title=item['title'],
        defaults={
            'primary_author': item['authors'][0],
            'co_authors': ", ".join(item['authors'][1:]),
            'author_type': item['author_type'],
            'journal': item['journal'],
            'publisher': item['publisher'],
            'year': item['year'],
            'domain': item['domain'],
            'citations': item['citations'],
            'featured': item.get('featured', False),
            'is_dark_featured': item.get('is_dark_featured', False),
            'abstract': item['abstract'],
            'doi': item.get('doi', ''),
            'pdf_url': item.get('pdf_url', ''),
            'keywords': ", ".join(item.get('keywords', [])),
            'status': 'published'
        }
    )

print("Mock data successfully populated into DB.")
