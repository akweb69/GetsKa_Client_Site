import { HeroBanner, HireDesignersBlock, DesignerCard } from '../components/Shared'

const designers = [
  { id: '1', name: 'Jamil Hasan', role: 'Graphic Designer', rating: '4.9', jobs: '300', skills: ['Logo Design','Branding','Print Design','Banner Design'] },
  { id: '2', name: 'Sanjida Islam', role: 'Graphic Designer', rating: '4.8', jobs: '250', skills: ['Logo Design','Trending','Print Design'] },
  { id: '3', name: 'Rakib Hasan', role: 'UI/UX Designer', rating: '4.8', jobs: '200', skills: ['User Experience Design','Web Design','App Design'] },
  { id: '4', name: 'Abdur Rahaman', role: 'Motion Designer', rating: '4.5', jobs: '220', skills: ['3D Motion','Animator','Logo Animation'] },
  { id: '5', name: 'Abdul Karim', role: 'Web Developer', rating: '4.75', jobs: '250', skills: ['Web Application','Bootstrap','Web Design','React'] },
  { id: '6', name: 'Abdul Karim', role: 'Wordpress Developer', rating: '4.8', jobs: '180', skills: ['Wordpress','Landing Page','Lead Generation','Elementor'] },
  { id: '7', name: 'Emdad Islam', role: 'Content Writer', rating: '4.75', jobs: '220', skills: ['Copywriting','Blog','Article','SEO'] },
  { id: '8', name: 'Sanjana Ahmed', role: 'Digital Marketer', rating: '4.75', jobs: '180', skills: ['Digital Marketing','SEO','Logo Generation','Google Ads'] },
  { id: '9', name: 'Sanjida Islam', role: 'Web Designer', rating: '4.8', jobs: '190', skills: ['Web Design','CSS','HTML','Web Application'] },
  { id: '10', name: 'Sorif Islam', role: 'Video Editor', rating: '4.75', jobs: '160', skills: ['Video Editing','Motion Design','Music Video','VFX & Duets'] },
  { id: '11', name: 'Asif Mahmud', role: 'Web Designer', rating: '4.9', jobs: '160', skills: ['Web Design','CSS','HTML','Web Application'] },
  { id: '12', name: 'Nahid Islam', role: 'Motion Designer', rating: '4.8', jobs: '260', skills: ['3D Motion','Animator','Logo Animation'] },
]

const HireDesigner = () => {
  return (
    <div className="bg-[#f5f5ff]">
      <HeroBanner
        title="Hire Designer"
        subtitle="Unlock creative potential by hiring skilled designers for your next project, tailored to your unique needs."
      />

      {/* Designers Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {designers.map(d => (
            <DesignerCard key={d.id} {...d} />
          ))}
        </div>
      </section>

      <HireDesignersBlock />
    </div>
  )
}

export default HireDesigner
