const fs = require('fs');

let content = fs.readFileSync('index.html', 'latin1');
// Latin1 reading preserves all bytes.
// If the file was actually UTF-8, some bytes might look weird in latin1.
// Let's decode it correctly. If 'InÃ­cio' is in latin1 string, it was utf8.
if (content.indexOf('InÃ­cio') !== -1 || content.indexOf('InÃ') !== -1 || content.indexOf('HistÃ³ria') !== -1) {
    content = Buffer.from(content, 'latin1').toString('utf8');
}

// Guarantee we don't have artifacts
content = content.replace(/INÍFÃ¡CIO|InÍƒÂ­cio|InÃ­cio|In\u00EDcio|In\uFFFDcio/g, 'Início');
content = content.replace(/CARDÍFÃ¡PIO|CardÍƒÂ¡pio|CardÃ¡pio|Card\u00E1pio|Card\uFFFDpio/g, 'Cardápio');
content = content.replace(/HistÃ³ria|HistÍƒÂ³ria|Hist\u00F3ria|Hist\uFFFDria/g, 'História');
content = content.replace(/experiÃªncias|experiÍƒÂªncias|experi\u00EAncias|experi\uFFFDncias/g, 'experiências');
content = content.replace(/extraordinÃ¡rias|extraordinÍƒÂ¡rias|extraordin\u00E1rias|extraordin\uFFFDrias/g, 'extraordinárias');
content = content.replace(/dedicaÃ§Ã£o|dedicaÍƒÂ§ÍƒÂ£o|dedica\u00E7\u00E3o|dedica\uFFFD\uFFFDd/g, 'dedicação');
content = content.replace(/empadÃµes|empadÍƒÂµes|empad\u00F5es|empad\uFFFDes/g, 'empadões');
content = content.replace(/clÃ¡ssicos|clÍƒÂ¡ssicos|cl\u00E1ssicos|cl\uFFFDssicos/g, 'clássicos');
content = content.replace(/atÃ©|atÍƒÂ©|at\u00E9|at\uFFFD/g, 'até');
content = content.replace(/genuÃ­nos|genuÍƒÂ­nos|genu\u00EDnos|genu\uFFFDnos/g, 'genuínos');
content = content.replace(/Ãšteis|ÍƒÂšteis|\u00DAteis|\uFFFDteis/g, 'Úteis');
content = content.replace(/vocÃª|vocÍƒÂª|voc\u00EA|voc\uFFFD/g, 'você');
content = content.replace(/PrÃ³ximo|PrÍƒÂ³ximo|Pr\u00F3ximo|Pr\uFFFDximo/g, 'Próximo');

// Insert the exact B2B module, BUT replacing the button text with "Consulte nossos preços"
const b2bOld = /<!-- Sobre Section \(Placeholder text to allow anchoring\) -->\s*<section class="about-section" id="sobre">/s;
const b2bNew = `<!-- Seção Revendedores (B2B) -->
    <section class="b2b-section fade-in" id="revenda">
        <div class="b2b-container">
            <div class="b2b-text">
                <h2>Leve a Jey Foods para o Seu Negócio</h2>
                <p>Nossos produtos são a escolha perfeita para encantar os clientes do seu café, padaria, empório ou eventos corporativos.</p>
                <p>Oferecemos <strong>condições exclusivas para revenda</strong> com a mesma qualidade premium artesanal que nos tornou referência.</p>
                <ul class="b2b-benefits">
                    <li><i class="fas fa-box-open"></i> Pedidos flexíveis para atacado</li>
                    <li><i class="fas fa-truck-fast"></i> Logística pontual</li>
                    <li><i class="fas fa-star"></i> Alto valor agregado ao seu balcão</li>
                </ul>
                <a href="https://wa.me/5541995382815?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20as%20condi%C3%A7%C3%B5es%20da%20Jey%20Foods%20para%20Revendedores." target="_blank" class="b2b-btn">
                    <i class="fab fa-whatsapp"></i> Consulte nossos preços
                </a>
            </div>
            <div class="b2b-image">
                <img src="assets/doces_demo.jpg" alt="Produtos em Atacado para Revenda" onerror="this.src='assets/doces_demo.jpg'">
            </div>
        </div>
    </section>

    <!-- Sobre Section (Placeholder text to allow anchoring) -->
    <section class="about-section fade-in" id="sobre">`;
content = content.replace(b2bOld, b2bNew);

const seoOld = /<meta name="description".*?<link rel="icon" type="image\/png" href="assets\/Logo%20sem%20fundo%20-%20Jey%20Foods\.png">/s;
const seoNew = `<!-- SEO & Social Meta Tags -->
    <meta name="description" content="Na Jey Foods transformamos ingredientes simples em experiências extraordinárias. Empadões suculentos e os melhores cookies artesanais!">
    <meta name="keywords" content="doces artesanais, salgados finos, comprar empadão, cookies recheados, confeitaria, Jey Foods, comida artesanal, b2b, revenda doces">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="Jey Foods | O Autêntico Sabor Artesanal">
    <meta property="og:description" content="Desperte seus sentidos com nossos empadões cremosos e cookies super recheados. Peça agora!">
    <meta property="og:image" content="https://i.imgur.com/kItM4P5.jpeg">
    <meta property="og:url" content="https://jeyfoods.com.br">
    <meta property="og:type" content="website">
    
    <link rel="icon" type="image/png" href="assets/Logo%20sem%20fundo%20-%20Jey%20Foods.png">`;
content = content.replace(seoOld, seoNew);

const btnOld = '<button id="back-to-top"';
const btnNew = `<!-- Botão Flutuante WhatsApp -->
    <a href="https://wa.me/5541995382815?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20ou%20tirar%20d%C3%BAvidas." target="_blank" class="floating-whatsapp" aria-label="Fale conosco no WhatsApp">
        <i class="fab fa-whatsapp"></i>
    </a>
    <button id="back-to-top"`;
if (content.indexOf('floating-whatsapp') === -1) {
    content = content.replace(btnOld, btnNew);
}

// Modify the "Falar com Consultor B2B" to "Consulte nossos preços" if the B2B is already there
content = content.replace(/>\s*Falar com Consultor B2B\s*<\/a>/g, '> Consulte nossos preços </a>');
content = content.replace(/Falar com Consultor B2B/g, 'Consulte nossos preços');

// And add revendedores link if missing
if (content.indexOf('revendedores.html') === -1) {
    content = content.replace('<a href="#sobre">Sobre</a>', '<a href="revendedores.html">Revendedores</a>\\n                <a href="#sobre">Sobre</a>');
    content = content.replace('<li><a href="#sobre">Quem Somos</a></li>', '<li><a href="revendedores.html">Revendedores</a></li>\\n                    <li><a href="#sobre">Quem Somos</a></li>');
}

// Fix anything that could be corrupted because it was already there (like the user modifying the file)
content = content.replace(/In.cio/g, 'Início');
content = content.replace(/Card.pio/g, 'Cardápio');
content = content.replace(/Hist.ria/g, 'História');

// IMPORTANT: Write back as explicit UTF-8 with BOM using \ufeff to force browsers and git to see it as UTF-8
fs.writeFileSync('index.html', '\\ufeff' + content, 'utf8');
console.log("SUCCESS");
