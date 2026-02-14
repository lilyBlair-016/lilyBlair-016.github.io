import '../css/about.css';

export default function AboutPage() {
  return (
    <section>
      <div className="about-section">
        <h2>About Bark Avenue</h2>
        <p>
          Welcome to Bark Avenue, your premier destination for all things pets!
          Founded with a passion for animal welfare and pet care, we strive to
          provide the highest quality products for your beloved companions.
        </p>
        <p>
          Our carefully curated selection includes premium pet food, engaging
          toys, comfortable bedding, and stylish accessories. We believe every
          pet deserves the best, and we&apos;re here to make that possible.
        </p>
        <p>
          At Bark Avenue, we&apos;re more than just a pet store &mdash; we&apos;re a
          community of pet lovers dedicated to enhancing the lives of pets and
          their owners. Join us on this exciting journey!
        </p>
      </div>

      <div className="owner-profile">
        <h3>Meet the Owner</h3>
        <img
          src={`${import.meta.env.BASE_URL}images/Owner_Pic.jpg`}
          alt="Allysa Padilla"
          className="owner-image"
        />
        <h4 className="owner-name">Allysa Padilla</h4>
        <p>
          A passionate pet lover and entrepreneur, Allysa founded Bark Avenue
          with the vision of creating a one-stop shop for pet owners. With years
          of experience in pet care, she ensures every product meets the highest
          standards of quality.
        </p>
        <p>
          When she&apos;s not running the store, you can find her volunteering at
          local animal shelters and advocating for pet adoption.
        </p>
      </div>
    </section>
  );
}
