const express = require("express");
const {Client} = require("@elastic/elasticsearch");
const app = express();
const port = 3000; 
// app.use(express.static('public')); // Menyajikan file statis dari folder 'public'

//Konfigurasi elasticsearch
const client = new Client ({
    node: 'http://192.168.200.80:9200' //ip dielasticsearch
});

//endpoint get data dari elasticsearch
app.get('/api/data', async (req, res) => {
    try {
        const result = await client.search({
            index: 'mika', // Ganti sesuai nama index yang Anda gunakan
            body: {
                query: {
                    match_all: {} // Sesuaikan query jika diperlukan
                }
            }
        });

        // Log respons lengkap untuk verifikasi struktur
        console.log("Respons ElasticSearch:", JSON.stringify(result, null, 2));

        // Pengecekan dan ekstraksi langsung tanpa asumsi adanya 'body'
        if (result && result.hits && Array.isArray(result.hits.hits)) {
            console.log("Hits ditemukan dan merupakan array dengan panjang:", result.hits.hits.length);

            // Ambil _source dari setiap hit
            const data = result.hits.hits.map(hit => hit._source);
            res.json(data);
        } else {
            console.log("Struktur respons tidak sesuai harapan:", result);
            res.status(404).send('Data tidak ditemukan atau struktur response salah');
        }

    } catch (error) {
        console.error("Error saat mengambil data dari ElasticSearch:", error);
        res.status(500).send('Terjadi kesalahan saat mengambil data dari ElasticSearch');
    }
});

//endpoint total data  dari elasticsearch
app.get('/api/count/data', async (req, res) => {
    try {
        const result = await client.count({
            index: 'mika', // Ganti sesuai nama index yang Anda gunakan
            body: {
                query: {
                     // Sesuaikan query jika diperlukan
                     match_all: {}
                }
            }
        });

        // Log respons lengkap untuk verifikasi struktur
        console.log("Respons ElasticSearch:", JSON.stringify(result.count, null, 2));

        // Menampilkan data berupa JSON
         res.json({
                Total_Data: result.count,
            })

    } catch (error) {
        console.error("Error saat mengambil data dari ElasticSearch:", error);
        res.status(500).send('Terjadi kesalahan saat mengambil data dari ElasticSearch');
    }
});

//endpoint total data by gender dari elasticsearch
app.get('/api/count/bygender', async (req, res) => {
    try {
        const result_jk_j = await client.count({
            index: 'mika', // Ganti sesuai nama index yang Anda gunakan
            body: {
                query: {
                     // Sesuaikan query jika diperlukan
                     match:{
                            "jk": "jantan"
                     }
                }
            }
        });

         const result_jk_b = await client.count({
            index: 'mika', // Ganti sesuai nama index yang Anda gunakan
            body: {
                query: {
                     // Sesuaikan query jika diperlukan
                     match:{
                            "jk": "betina"
                     }
                }
            }
        });
        
        // Log respons lengkap untuk verifikasi struktur
        // console.log("Respons ElasticSearch:", JSON.stringify(result.count, null, 2));

        // Menampilkan data berupa JSON
         res.json({
                Total_Jantan: result_jk_j.count,
                Total_Betina: result_jk_b.count,
            })

    } catch (error) {
        console.error("Error saat mengambil data dari ElasticSearch:", error);
        res.status(500).send('Terjadi kesalahan saat mengambil data dari ElasticSearch');
    }

});

app.listen(port, ()=>{
    console.log(`server berjalan di http://localhost:${port}`);
});