import { useEffect } from 'react';
import useAllDesigner from '../AdminCode/Hooks/useAllDesigner';
import { HeroBanner, HireDesignersBlock, DesignerCard } from '../components/Shared'
import AdminLoader from './../AdminCode/Components/AdminLoader';


const HireDesigner = () => {

  const { designerLoading, allDesigner } = useAllDesigner();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [allDesigner])

  if (designerLoading) {
    return (
      <AdminLoader />
    )
  }

  return (
    <div className="bg-[#f5f5ff]">
      <HeroBanner
        title="Hire Designer"
        subtitle="Unlock creative potential by hiring skilled designers for your next project, tailored to your unique needs."
      />

      {/* Designers Grid */}
      <section className="w-11/12 mx-auto py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {allDesigner?.map(d => (
            <DesignerCard key={d.id} {...d} />
          ))}
        </div>
      </section>

      <HireDesignersBlock />
    </div>
  )
}

export default HireDesigner
