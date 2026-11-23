import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Tabs,
  Tab,
  Modal,
  Paper,
  IconButton,
  Button
} from '@mui/material';
import { X, ExternalLink } from 'lucide-react';
import profileData from '../data/profile.json';
import SectionHeader from './SectionHeader';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <Modal open={Boolean(project)} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Paper
        sx={{
          width: '100%',
          maxWidth: 760,
          maxHeight: '88vh',
          overflowY: 'auto',
          borderRadius: 4,
          p: { xs: 3, md: 4 },
          outline: 'none',
          position: 'relative'
        }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12 }} aria-label="Close">
          <X size={20} />
        </IconButton>

        <Typography sx={{ fontSize: 12, fontWeight: 800, color: '#573CDD', textTransform: 'uppercase', letterSpacing: '0.06em', mb: 1 }}>
          {project.type}
        </Typography>
        <Typography sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: 800, color: '#171A1F', mb: 2, pr: 4 }}>
          {project.title}
        </Typography>
        <Typography sx={{ fontSize: 16, color: '#565D6D', lineHeight: 1.6, mb: 3 }}>
          {project.description}
        </Typography>

        {project.modules?.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 800, color: '#171A1F', borderBottom: '1px solid #E5E7EB', pb: 1, mb: 2 }}>
              Modules
            </Typography>
            {project.modules.map((mod, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#171A1F', mb: 0.5 }}>{mod.name}</Typography>
                {mod.points.map((pt, j) => (
                  <Typography key={j} sx={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>• {pt}</Typography>
                ))}
              </Box>
            ))}
          </Box>
        )}

        {project.highlights?.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 800, color: '#171A1F', borderBottom: '1px solid #E5E7EB', pb: 1, mb: 2 }}>
              Key Highlights
            </Typography>
            {project.highlights.map((h, i) => (
              <Typography key={i} sx={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>• {h}</Typography>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: project.link ? 3 : 0 }}>
          {project.tech?.map((t) => (
            <Chip key={t} label={t} size="small" sx={{ bgcolor: '#F3F4F6', fontWeight: 600 }} />
          ))}
        </Box>

        {project.link && (
          <Button
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            endIcon={<ExternalLink size={16} />}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, color: '#573CDD', borderColor: 'rgba(87,60,221,0.35)' }}
          >
            View on GitHub
          </Button>
        )}
      </Paper>
    </Modal>
  );
};

const ProjectCard = ({ project, onOpen }) => (
  <Card
    elevation={0}
    sx={{
      height: '100%',
      borderRadius: 4,
      overflow: 'hidden',
      bgcolor: 'white',
      boxShadow: '0 8px 24px rgba(87, 60, 221, 0.08)',
      transition: 'all 0.3s ease',
      '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 40px rgba(87, 60, 221, 0.18)' }
    }}
  >
    <CardActionArea onClick={() => onOpen(project)} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      <Box sx={{ height: 160, bgcolor: '#E9E4FB', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Chip
          label={project.category === 'personal' ? 'PERSONAL' : 'WORK'}
          size="small"
          sx={{ position: 'absolute', top: 14, right: 14, bgcolor: '#573CDD', color: 'white', fontWeight: 800, fontSize: 11 }}
        />
        <Typography sx={{ fontSize: 44, fontWeight: 200, color: '#573CDD' }}>{project.title?.[0]}</Typography>
      </Box>
      <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
        <Typography sx={{ fontSize: 17, fontWeight: 700, color: '#171A1F', mb: 0.5 }}>{project.title}</Typography>
        <Typography sx={{ fontSize: 12, color: '#6B7280', mb: 1.5 }}>{project.type}</Typography>
        <Typography
          sx={{
            fontSize: 14,
            color: '#565D6D',
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {project.tech?.slice(0, 3).map((t) => (
            <Chip key={t} label={t} size="small" sx={{ bgcolor: 'rgba(87, 60, 221, 0.1)', color: '#573CDD', fontSize: 11, fontWeight: 700 }} />
          ))}
        </Box>
      </CardContent>
    </CardActionArea>
  </Card>
);

const Projects = () => {
  const projects = profileData.projects || [];
  const [tab, setTab] = useState('work');
  const [selected, setSelected] = useState(null);
  const visible = projects.filter((p) => (p.category || 'work') === tab);

  return (
    <Container id="projects" maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
      <SectionHeader>Projects</SectionHeader>
      <Typography sx={{ fontSize: 16, color: '#565D6D', mb: 4, fontWeight: 500 }}>
        Selected work showcasing enterprise systems, AI-assisted engineering and modern applications.
      </Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab value="work" label="Work Projects" />
        <Tab value="personal" label="Personal Projects" />
      </Tabs>

      <Box
        sx={{
          bgcolor: '#F7F7FB',
          borderRadius: 4,
          p: { xs: 2, md: 3 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 3
        }}
      >
        {visible.map((project, i) => (
          <ProjectCard key={i} project={project} onOpen={setSelected} />
        ))}
        {visible.length === 0 && (
          <Typography sx={{ color: '#6B7280', p: 2 }}>More projects coming soon.</Typography>
        )}
      </Box>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Container>
  );
};

export default Projects;
