import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-4 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>About</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mt-6 mb-4">About</h1>
      <p className="text-gray-600 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in turpis
        nec arcu mattis eleifend. Integer vitae commodo turpis, vitae congue nibh.
      </p>
    </div>
  );
}
